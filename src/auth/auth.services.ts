import { Injectable, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getByEmail(email);

    // Verificar si el usuario existe
    if (!user) {
      throw new BadRequestException('¡Credenciales inválidas!');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('¡Credenciales inválidas!');
    }

    const userPayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin, // Uso correcto de isAdmin
    };

    const token = this.jwtService.sign(userPayload); // Corrección: this.jwtService

    return {
      token,
      message: '¡Usuario logueado exitosamente!',
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
}
