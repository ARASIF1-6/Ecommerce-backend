import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './User.entity';
import { UserService } from './User.service';
import { UserController } from './User.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],  // Export UserService and TypeOrmModule
})
export class UserModule {}
