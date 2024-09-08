import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { ChatService } from './chat.service';
import { RedisService } from 'src/Auth/Redis/redis.service';
import { UserService } from 'src/User/User.service';
import { use } from 'passport';
import { NotFoundError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common';
  
  @WebSocketGateway({ cors: true })
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    constructor(
      private chatService: ChatService,
      private redisService: RedisService,
      private userService: UserService
    ) {}
  
    // When a client connects
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    // When a client disconnects
    async handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      const userId = await this.redisService.getActiveUser(client.id);
      if (userId) {
        await this.redisService.delActiveUser(client.id);
        this.broadcastActiveUsers();
        console.log(`User ${userId} disconnected and removed from active users`);
      }
    }
  
@SubscribeMessage('join')
async handleJoin(@ConnectedSocket() client: Socket, @MessageBody() userId: string) {
    const userIdInt = parseInt(userId, 10);
    const response = await this.userService.SearchByID(userIdInt);

    if (response) {
        console.log(`User ${userId} joined with socket ID: ${client.id}`);
        client.join(userId);
        await this.redisService.setActiveUser(client.id, userId);
        this.broadcastActiveUsers();
    } else {
        console.error(`User ${userId} not found in the database. Disconnecting socket.`);
        client.emit('error', 'User not found'); // Optionally emit an error message to the client
        client.disconnect(); // Disconnect the socket
    }
}

  
    // When a message is sent
    @SubscribeMessage('message')
    async handleMessage(
      @ConnectedSocket() client: Socket,
      @MessageBody() message: { senderId: string; receiverId: string; text: string },
    ) {
      console.log('Received message on server:', message);
  
      const savedMessage = await this.chatService.saveMessage(
        message.senderId,
        message.receiverId,
        message.text,
      );
  
      // Emit to receiver
      this.server.to(message.receiverId).emit('message', savedMessage);
  
      // Emit to sender for confirmation
      client.emit('message', savedMessage);
  
      console.log('Message emitted to receiver:', message.receiverId);
    }
  
    // Broadcast active users to all connected clients
    private async broadcastActiveUsers() {
      const userIds = await this.redisService.keysActiveUser('*'); // Get all keys (socket IDs)
    //   console.log("userIds"+userIds);
      const users = Array.from(new Set(await Promise.all(userIds.map(async id => await this.redisService.getActiveUser(id))))); // Get unique user IDs
      this.server.emit('activeUsers', users);
       console.log('Active users updated:', users);
    }
  }
  