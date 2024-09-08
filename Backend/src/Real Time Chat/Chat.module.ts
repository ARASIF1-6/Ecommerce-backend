// src/chat/chat.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { UserModule } from 'src/User/User.module';
import { UserEntity } from 'src/User/User.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Message, UserEntity]),
    UserModule,],  // Import the Message entity
    providers: [ChatService, ChatGateway],  // Provide the ChatService and ChatGateway
    controllers: [ChatController],  // Register the ChatController
})
export class ChatModule {}
