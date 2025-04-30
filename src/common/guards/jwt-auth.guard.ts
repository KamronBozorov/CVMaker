import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']; // yoki request.headers.authorization

    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization;
    console.log(auth);

    if (!auth) throw new UnauthorizedException('Auth not provided');

    const token = auth.split(' ')[1];

    if (!token) throw new UnauthorizedException('Token not provided');

    try {
      const decodedData = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });

      req.user = decodedData;

      return true;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid token');
    }
  }
}
