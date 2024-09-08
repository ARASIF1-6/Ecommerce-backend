import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../Auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy,'local')
{
    constructor(private authservice:AuthService){
        super();
       // console.log("abc: ")
    }
    async validate(username: string, password: string) {
        const user = await this.authservice.validateUser(username, password);
       // console.log("Secret key in local strategy: "+`${process.env.jwt_secret}`)


        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
      }

}