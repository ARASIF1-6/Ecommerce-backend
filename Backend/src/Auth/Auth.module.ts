import { Module } from "@nestjs/common";
import { AuthService } from "./Auth.service";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/User/User.service";
import { LocalStrategy } from "./Strategies/local.strategy";
import { AuthController } from "./Auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/User/User.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./Strategies/jwt.stategy";
import { refreshTokenStrategy } from "./Strategies/refreshToken.strategy";
import { RolesGaurd } from "./Role/Roles.gaurd";
import { RedisService } from "./Redis/redis.service";
import { JwtGaurd } from "./Gaurds/jwt-auth.gaurd";
import { EmailOTPService } from "src/EmailOTP/EmailOTP.service";
// import { SimpleJwtGuard, SimpleJwtStrategy } from "./Gaurds/Simple_gaurd";
@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: `${process.env.jwt_secret}`,
        signOptions: { expiresIn: '1h' },
      }),
      TypeOrmModule.forFeature([UserEntity]),
    ],
    providers: [
      AuthService,
      UserService,
      LocalStrategy,
      JwtStrategy,
      // JwtGaurd,
      refreshTokenStrategy,
    //   SimpleJwtStrategy,SimpleJwtGuard,
      RolesGaurd,
      RedisService,
      EmailOTPService,
    ],
    controllers: [AuthController],
  })
  export class AuthModule {}
  