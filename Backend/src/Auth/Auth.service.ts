import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { promises } from "dns";
import { UserEntity } from "src/User/User.entity";
import { UserService } from "src/User/User.service";
import { RedisService } from "./Redis/redis.service";
import * as jwt from 'jsonwebtoken';
import { EmailOTPService } from "src/EmailOTP/EmailOTP.service";
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
      private jwtService: JwtService,
      private readonly redisService: RedisService,
      private readonly otpService: EmailOTPService,
    ) { }

    async validateUser(username: string, password: string): Promise<UserEntity> {
        let validate = await this.userService.validate(username, password);

        //  console.log("validate:"+(await validate).email)
        //  console.log("validate:"+(await validate).password)

        if (validate != null) {
            return validate;
        }
        return null;
    }
    async login(user: UserEntity) {
        const payload = {
            email: user.email,//username
            sub: {
                role: user.role,
            }
        }
      //  console.log("Secret key in service: "+`${process.env.jwt_secret}`)
        const accessToken = await this.jwtService.signAsync(payload, { secret: `${process.env.jwt_secret}`});
        const refreshToken = await this.jwtService.signAsync(payload, { 
          secret: `${process.env.jwt_secret}`, 
          expiresIn: '1d'
        });


        return {
            ...user,
            accessToken: accessToken,
            refreshToken: refreshToken
        };

    }

    async validateRefreshToken(token: string): Promise<any> {
        try {
            const check= jwt.verify(token,`${process.env.jwt_secret}`);
        //     console.log("Check:"+check);
          return check;
        } catch (error) {
       //   console.error("Error verifying token:", error.message);
          throw new UnauthorizedException('Invalid refresh token');
        }
      }
    
      async RefreshToken(refreshToken: string,req:any) {
      //  console.log("Refreshtoken in service:"+refreshToken);
        const decoded = await this.validateRefreshToken(refreshToken);
     //   console.log(decoded);
    
        if (!decoded) {
          throw new UnauthorizedException('Invalid refresh token');
        }
        const authorizationHeader = req.headers['authorization'];
        console.log("authorizationHeader:"+authorizationHeader);
        const token = authorizationHeader.split(' ')[1];
        await this.logout(token);
        const payload = { email: decoded.email, sub: { role: decoded.sub.role } };
        const accessToken = await this.jwtService.signAsync(payload, { secret: `${process.env.jwt_secret}`});
        return { accessToken };
      }
    

    async SignUpOTPCheck(userEntity: UserEntity): Promise<any> {
      const existingUser = await this.userService.findByEmail(userEntity.email);
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
      const email= userEntity.email;
      const otpResponse = await this.otpService.sendOtpEmailForSignup(userEntity)
      // console.log(otpResponse);
      if(otpResponse=='OTP sent successfully')
      {
        return {message:"Email sent successfully"};

      }
      return {message:"Does not sent OTP"};

    }
    async Signup(email:string,otp:string):Promise<any>
    {
      const responseRedis= await this.redisService.getOtp(email);
      console.log("responseRedis"+responseRedis);
      console.log("responseRedis"+JSON.stringify(responseRedis));
      console.log("responseRedis:"+JSON.parse(responseRedis));
       const RedisDetails=JSON.parse(responseRedis)
      if(RedisDetails.otp==otp)
      {
        const userEntity = new UserEntity();
    userEntity.name = RedisDetails.name;
    userEntity.email = RedisDetails.email;
    userEntity.address = RedisDetails.address;
    userEntity.phone = RedisDetails.phone;
    userEntity.password = RedisDetails.password; // Ensure that password is hashed before saving
    userEntity.registration_date = new Date();
    userEntity.role = RedisDetails.role;
    userEntity.Image = RedisDetails.Image;
    await this.redisService.deleteOtp(email);

   return await this.userService.SignUp(userEntity);
     
  }
  else
  {
    return {message:"OTP is not matched"};

    }
  }
    async logout(token: string) {
        const decoded = this.jwtService.decode(token) as any;
        const currentTime = Math.floor(Date.now() / 1000);
        
        // Check if the token is already expired
        if (decoded.exp <= currentTime) {
          console.log('Token is already expired');
          return;
        }
        
        const expiry = decoded.exp - currentTime;
        await this.redisService.blacklistToken(token, expiry);
      }

      async GoogleAuth(logindata:any): Promise<{ access_token: string } | any> {
        console.log("logindata"+logindata.Image);
        const user = await this.userService.findByEmail(logindata.email);
        if (user) {
          if(user.email == logindata.email){
            const payload = logindata;
            return {
              access_token: await this.jwtService.signAsync(payload),
            };
          }
        }
        else{
          try{
            logindata.password = await this.generateRandomPassword();
            logindata.registration_date=new Date();
            console.log('Generated password:', logindata.password);

            if (typeof logindata.password !== 'string') {
                throw new Error('Password must be a string');
            }

            const response =await this.userService.SignUp(logindata);
            if(response)
            {
              const payload = logindata;
              return {
                access_token: await this.jwtService.signAsync(payload),
              };
            }
            else{
              throw new InternalServerErrorException("Failed to registration");
            }
             
          }
          catch(error){
            console.error('Error during GoogleAuth:', error); 
            throw new InternalServerErrorException("Failed to registration");
          }
        } 

   }
   async generateRandomPassword(length: number = 12): Promise<string> {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
 }

}