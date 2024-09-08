// // src/sms/sms.service.ts
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Vonage } from '@vonage/server-sdk';

// @Injectable()
// export class SmsService {
//   private vonage: Vonage;

//   constructor(private configService: ConfigService) {
//     const apiKey = this.configService.get<string>('NEXMO_API_KEY');
//     const apiSecret = this.configService.get<string>('NEXMO_API_SECRET');
//     this.vonage = new Vonage({
//       apiKey: apiKey!,
//       apiSecret: apiSecret!,
//     });
//   }

//   async sendSms(to: string, text: string): Promise<void> {
//     const from = this.configService.get<string>('NEXMO_FROM_NUMBER');
//     try {
//       const response = await this.vonage.sms.send({
//         to,
//         from,
//         text,
//       });
//       console.log('Message sent successfully:', response);
//     } catch (error) {
//       console.error('Failed to send message:', error);
//     }
//   }
// }
