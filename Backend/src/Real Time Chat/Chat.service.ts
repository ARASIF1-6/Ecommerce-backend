// src/chat/chat.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { UserEntity } from 'src/User/User.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // Save a new message to the database
  async saveMessage(
    senderId: string,
    receiverId: string,
    text: string,
  ): Promise<Message> {
    const sender = await this.userRepository.findOne({ where: { Id: parseInt(senderId, 10) } });
    const receiver = await this.userRepository.findOne({ where: { Id: parseInt(receiverId, 10) } });

    if (!sender || !receiver) {
      throw new NotFoundException('Sender or receiver not found');
    }

    const message = this.messageRepository.create({
      sender,
      receiver,
      text,
    });

    return this.messageRepository.save(message);
  }

  // Get all messages between two users
  async getMessagesBetweenUsers(user1Id: number, user2Id: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: [
        { sender: { Id: user1Id }, receiver: { Id: user2Id } },
        { sender: { Id: user2Id }, receiver: { Id: user1Id } },
      ],
      relations: ['sender', 'receiver'],
      order: { createdAt: 'ASC' },
    });
    return messages;
  }
}
