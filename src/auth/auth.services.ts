import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getByEmail(email);

    if (!user) {
      throw new BadRequestException('¡Credenciales inválidas!');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('¡Credenciales inválidas!');
    }
    if (user.isBanned) {
      throw new UnauthorizedException(
        'Tu cuenta ha sido baneada. Contacte al administrador.',
      );
    }

    if (!user.status) {
      throw new UnauthorizedException(
        'Usuario inactivo. Contacte al administrador.',
      );
    }

    const userPayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        profileImgUrl: user.profileImgUrl,
      },
    };
  }

  async signUp(user: CreateUserDto) {
    const foundUser = await this.usersRepository.getByEmail(user.email);

    if (foundUser) {
      throw new BadRequestException('¡El usuario ya ha sido usado!');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) {
      throw new BadRequestException(
        '¡Se ha generado un error al hashear el password!',
      );
    }

    await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    const { password, ...userWithoutPass } = user;

    return userWithoutPass;
  }

  async googleLogin(idToken: string) {
    const ticket = await this.googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Token de Google no válido');
    }

    const { email, name } = payload;

    let user = await this.usersRepository.getByEmail(email);

    if (user && !user.status) {
      throw new UnauthorizedException(
        'Usuario inactivo. Contacte al administrador.',
      );
    }

    if (!user) {
      user = await this.usersRepository.createUser({
        email,
        name: name ?? 'Usuario Google',
        password: '',
        phone: '0000000000',
        authProvider: 'google',
        status: true, // 👈 opcional: define el estado por defecto
      });
    }

    const userPayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin ?? false,
    };

    const token = this.jwtService.sign(userPayload);

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        profileImgUrl: user.profileImgUrl,
      },
    };
  }
}
