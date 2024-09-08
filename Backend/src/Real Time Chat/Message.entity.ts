import { UserEntity } from 'src/User/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, user => user.sentMessages)
  sender: UserEntity;

  @ManyToOne(() => UserEntity, user => user.receivedMessages)
  receiver: UserEntity;

  @Column()
  text: string;

  @CreateDateColumn()
  createdAt: Date;
}
