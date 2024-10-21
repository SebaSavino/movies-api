import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { IS_PUBLIC_KEY } from './decorators/is-public.decorator';
import { ROLES_KEY } from './decorators/roles.decorator';
import { UserRole } from 'src/users/user.schema';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this._reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const requiredRoles = this._reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this._extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload: JwtPayload = await this._jwtService.verifyAsync(token, {
        secret: this._configService.get('JWT_SECRET'),
      });

      const hasRequiredRoles = requiredRoles.some((role) =>
        payload.roles.includes(role),
      );

      if (!hasRequiredRoles) {
        throw new Error();
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private _extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
