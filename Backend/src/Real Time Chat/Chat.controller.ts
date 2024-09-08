// src/chat/chat.controller.ts

import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Message } from './message.entity';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  // Get messages between two users
  @Get('messages-between/:user1/:user2')
  async getMessagesBetweenUsers(
    @Param('user1', ParseIntPipe) user1: number,
    @Param('user2', ParseIntPipe) user2: number,
  ): Promise<Message[]> {
    return this.chatService.getMessagesBetweenUsers(user1, user2);
  }
}
