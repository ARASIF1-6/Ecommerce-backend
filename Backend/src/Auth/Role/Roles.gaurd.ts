import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './Role.enum';
import { UserEntity } from 'src/User/User.entity';
import { Request } from 'express';
import { use } from 'passport';
import { UserService } from 'src/User/User.service';

@Injectable()
export class RolesGaurd implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService:UserService,
       ) {}

       canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            // No roles are required, so access is granted
            return true;
        }

        console.log("Required Roles:"+requiredRoles);

        const request = context.switchToHttp().getRequest();
        console.log("rrrrrrrrequest::"+request);

        const user = request.user;
        console.log("user::"+user.username);
       console.log("role::"+user.userId.role);
    // console.log("User Object JSON:", JSON.stringify(user, null, 2));

        if (!user) {
            // User object is missing on the request, deny access
            return false;
        }

        // Check if the user has any of the required roles
        return requiredRoles.some(role => user.userId.role === role);
    //    return true;
    }
}