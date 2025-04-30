import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (req.user.sub === req.params.id && req.user.role === 'user') return true;
    if (req.user.role === 'superadmin') return true;

    throw new ForbiddenException('You are not allowed to modify this resource');
  }
}
