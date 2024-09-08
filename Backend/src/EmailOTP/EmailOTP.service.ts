import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/User/User.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/Auth/Redis/redis.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailOTPService {
  constructor(
    private readonly mailerService: MailerService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService 
  ) {}








  async sendOtpEmail(to: string): Promise<any> {
    // console.log("Sending OTP to email: " + to);
    
    const user = await this.userRepo.find({ where: { email: to } });
    if (user.length > 0) { // If user array is not empty
      try {
        const otp = this.generateOtp();
        const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 30px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007bff; }
            .header h1 { color: #007bff; font-size: 24px; margin: 0; }
            .content { font-size: 16px; line-height: 1.6; padding: 20px; }
            .otp { font-size: 28px; font-weight: bold; color: #28a745; display: inline-block; padding: 10px; border-radius: 5px; background-color: #e9f5e9; border: 1px solid #d4edda; }
            .footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; }
            .footer a { color: #007bff; text-decoration: none; }
            .footer a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Forgot Password for E-commerce</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to reset your password. Your OTP code is:</p>
              <p class="otp">${otp}</p>
              <p>This OTP will be valid for the next 3 minutes. You can use this OTP for One time</p>
            </div>
            <div class="footer">
              <p>If you did not request this email, please <a href="#">ignore it</a>.</p>
              <p>For further assistance, contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      // console.log("1st check")
      //   console.log("Sending email...");
        
       const response= await this.mailerService.sendMail({
        from:  this.configService.get<string>('EMAIL_FROM'),
          to,
          subject: 'Forget Password for E-commerce',
          html: message,
        });
        
        // console.log("Email sent successfully"+JSON.stringify(response));
        
        await this.redisService.storeOtp(to, otp, 180);
        return 'OTP sent successfully';
        
      } catch (error) {
        console.error('Error sending OTP email:', error);
        return "Email didn't send: " + error.message;
      }
    } else {
      console.log("No user found with the email: " + to);
      return "No user found with the email: " + to;
    }
  }
  async verifyOtp(email: string, otp: string): Promise<string> {
    const storedOtp = await this.redisService.getOtp(email);
    if (storedOtp === otp) {
      await this.redisService.deleteOtp(email);
      return 'OTP verified successfully';
    }
    return 'Invalid OTP or OTP expired';
  }
  async sendOtpEmailForSignup(userEntity: UserEntity): Promise<any> {
    try {
      const to = userEntity.email;
      const otp = this.generateOtp();
      const message = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: 'Arial', sans-serif; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 30px auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #007bff; }
            .header h1 { color: #007bff; font-size: 24px; margin: 0; }
            .content { font-size: 16px; line-height: 1.6; padding: 20px; }
            .otp { font-size: 28px; font-weight: bold; color: #28a745; display: inline-block; padding: 10px; border-radius: 5px; background-color: #e9f5e9; border: 1px solid #d4edda; }
            .footer { margin-top: 30px; font-size: 14px; color: #888; text-align: center; }
            .footer a { color: #007bff; text-decoration: none; }
            .footer a:hover { text-decoration: underline; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Signup for E-commerce</h1>
            </div>
            <div class="content">
              <p>Hello,</p>
              <p>We received a request to Signup for E-commerce. Your OTP code is:</p>
              <p class="otp">${otp}</p>
              <p>This OTP will be valid for the next 3 minutes. You can use this OTP for one time only.</p>
            </div>
            <div class="footer">
              <p>If you did not request this email, please <a href="#">ignore it</a>.</p>
              <p>For further assistance, contact our support team.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      const response = await this.mailerService.sendMail({
        from: this.configService.get<string>('EMAIL_FROM'),
        to,
        subject: 'Signup for E-commerce',
        html: message,
        
      });

      // Store the OTP and user details in Redis
      await this.redisService.storeOtp(to, otp, 180);
      const redisResponse = await this.redisService.storeUserDetails(to, userEntity, otp, 300);
      if (redisResponse.message === 'User details and OTP stored') {
        return 'OTP sent successfully';
      } else {
        return "An error occurred";
      }

    } catch (error) {
      console.error('Error sending OTP email:', error);
      return "Email didn't send: " + error.message;
    }
  }
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
