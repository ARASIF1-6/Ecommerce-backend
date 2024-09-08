import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailOTPController } from './EmailOTP.controller';
import { EmailOTPService } from './EmailOTP.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from 'src/User/User.module'; // Import UserModule here
import { UserEntity } from 'src/User/User.entity'; // Import UserEntity
import { RedisModule } from '../Auth/Redis/redis.module'; // Import YourRedisModule
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigModule and ConfigService

@Module({
  
  imports: [
    TypeOrmModule.forFeature([UserEntity]), // Register UserEntity
    ConfigModule.forRoot(), // Ensure ConfigModule is imported
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<string>('EMAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
          defaults: {
            from: configService.get<string>('EMAIL_FROM'), 
          },
        },
      }),
      inject: [ConfigService],
    }),
    
    UserModule,
    RedisModule,
  ],
  controllers: [EmailOTPController],
  providers: [EmailOTPService],
})
export class EmailOTPModule {}
