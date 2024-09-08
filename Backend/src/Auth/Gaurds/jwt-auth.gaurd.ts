// import { Injectable, ExecutionContext } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class jwtGaurd extends AuthGuard('jwt') {}
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGaurd extends AuthGuard('jwt') {
//   handleRequest(err, user, info, context) {
//     console.log('Inside JwtGaurd handleRequest');
//     console.log('Error:', err);
//     console.log('User:', user);
//     console.log('Info:', info);
//     console.log("Secret key in JwtGaurd: "+`${process.env.jwt_secret}`)

//     if (err || !user) {
//       throw err || new UnauthorizedException();
//     }
//     return user;
//   }
}

