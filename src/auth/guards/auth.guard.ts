import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = request.headers.authorization?.split(' ')[1];

        if (!token) {
            throw new UnauthorizedException('¡No hay Token!');
        }

        try {
            const secret = process.env.JWT_SECRET;
            const user = this.jwtService.verify(token, { secret });

            request.user = {
                ...user,
                roles: user.isAdmin ? ['admin'] : ['user'], 
            };

            return true;

        } catch (error) {
            throw new UnauthorizedException('¡Token Inválido!');
        }
    }
}