// // src/app.controller.ts
// import { Controller, Get } from '@nestjs/common';
// import { SmsService } from './Sms.service';

// @Controller()
// export class AppController {
//   constructor(private readonly smsService: SmsService) {}

//   @Get('send-sms')
//   async sendSms(): Promise<void> {
//     const to = '+1234567890';  // The recipient's phone number
//     const text = 'Hello from NestJS with Vonage!';  // The message content
//     await this.smsService.sendSms(to, text);
//   }
// }
