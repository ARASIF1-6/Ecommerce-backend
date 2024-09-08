import { Controller, Post, Body, Res } from '@nestjs/common';
import { EmailOTPService } from './EmailOTP.service';
import { Response } from 'express';

@Controller('EmailOTP')
export class EmailOTPController {
  constructor(private readonly otpService: EmailOTPService) {}

  @Post('/send')
  async sendOtp(@Body('email') email: string): Promise<any> {
    return await this.otpService.sendOtpEmail(email);
  }

  @Post('/check')
  async checkOtp(@Body('email') email: string, @Body('otp') otp: string, @Res() res: Response): Promise<any> {
    const result = await this.otpService.verifyOtp(email, otp);
    if (result === 'OTP verified successfully') {
      res.clearCookie(email); // Clear the cookie if OTP is verified
      return res.json({ message: result });
    }
    return res.status(400).json({ message: result });
  }
}
