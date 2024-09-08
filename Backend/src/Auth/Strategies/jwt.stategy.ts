import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { RedisService } from '../Redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly redisService: RedisService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
      passReqToCallback: true,
    });
  }


  async validate(request: Request, payload: any) {
 //   console.log('Request :', request.rawHeaders[1]); //this is a way to get token

    // Extract token from header
    const authorizationHeader = request.headers['authorization']; //this is an another way to get token
   // console.log('Request3 :',  request.headers['authorization']);

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Extract the token from the Authorization header
    const token = authorizationHeader.split(' ')[1];
   // console.log('Raw JWT Token:', token);
    const isBlacklisted = await this.redisService.isBlacklisted(token);
    if (isBlacklisted) {
      throw new UnauthorizedException('Token is blacklisted');
    }

    // Access specific parts of the payload
    const userId = payload.sub;
    const username = payload.email;

    return { userId, username };
  }
}
