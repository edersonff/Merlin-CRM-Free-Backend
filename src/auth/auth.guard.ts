import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';

export const AuthRole = (role?: User['role'][]) => {
  @Injectable()
  class AuthGuard implements CanActivate {
    constructor(public jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException('Token não encontrado');
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });

        request['user'] = payload;

        const isRoleValid = role?.includes(payload.role);

        if (role && !isRoleValid && payload.role !== 'admin') {
          throw new UnauthorizedException(
            'Você não tem permissão para acessar essa rota',
          );
        }
      } catch (error) {
        throw new UnauthorizedException('Token não é valido');
      }
      return true;
    }

    extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  return AuthGuard;
};
