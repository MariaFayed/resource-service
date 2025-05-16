import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Guard to validate JWT
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    return super.canActivate(context);
  }

    handleRequest(err, user, info, context) {
    if (err || !user) {
      console.error('JWT Guard rejection reason:', info?.message || info);
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}