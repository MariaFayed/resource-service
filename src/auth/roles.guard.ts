import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //Guard to ensure that the user have has the required role to access the api
  canActivate(context: ExecutionContext): boolean {

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest().user;
    const userRoles = user?.realm_access?.roles || [];

    const hasRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRole) throw new ForbiddenException('You do not have the required role');
    return true;
  }
}
