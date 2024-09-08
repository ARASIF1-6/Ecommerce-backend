import { Body, Controller, Get, Param, ParseIntPipe, Req, UseGuards,Request } from '@nestjs/common';
import { UserEntity } from './User.entity';
import { UserService } from './User.service';
// import { jwtGaurd } from 'src/Auth/Gaurds/jwt-auth.gaurd';
// import { Roles } from 'src/Auth/Role/Roles.decorate';
// import { Role } from 'src/Auth/Role/Role.enum';
// import { RolesGaurd } from 'src/Auth/Role/Roles.gaurd';
import { Request as ExpressRequest } from 'express';
import { Roles } from 'src/Auth/Role/Roles.decorate';
import { Role } from 'src/Auth/Role/Role.enum';
import { JwtGaurd } from 'src/Auth/Gaurds/jwt-auth.gaurd';
import { RolesGaurd } from 'src/Auth/Role/Roles.gaurd';
import { AuthGuard } from '@nestjs/passport';
// import { SimpleJwtGuard, SimpleJwtStrategy } from 'src/Auth/Gaurds/Simple_gaurd';


@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

 @Roles(Role.User)
  //@UseGuards(jwtGaurd,RolesGaurd)
  @UseGuards(JwtGaurd,RolesGaurd)
  @Get('/search/:id')
  async SearchByID(@Param('id', ParseIntPipe) Id: number, @Request() req): Promise<null | UserEntity> {
      console.log(req.headers['authorization']); // To see if the token is present
      return await this.userService.SearchByID(Id);
  }
}
