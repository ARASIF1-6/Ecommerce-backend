import { SetMetadata } from "@nestjs/common";
import { Role } from "./Role.enum";

export const Roles = (...roles:Role[]) =>SetMetadata('roles',roles);