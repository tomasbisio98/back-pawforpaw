import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/users/users.repository';

@Injectable()
export class StatusGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = this.jwtService.verify(token);
      const user = await this.userRepository.getById(decodedToken.sub);

      if (!user || !user.status) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido o usuario inactivo');
    }
  }
}