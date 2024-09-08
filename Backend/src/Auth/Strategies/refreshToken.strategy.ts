import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class refreshTokenStrategy extends PassportStrategy(Strategy,'refreshJwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: `${process.env.jwt_secret}`,
        });
    }

    async validate(payload:any){
    //    console.log(payload.email+" "+ payload.sub)
        return { user: payload.sub, username: payload.email };
    }
}
