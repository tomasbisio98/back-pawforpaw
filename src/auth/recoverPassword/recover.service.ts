import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { MoreThan, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { RecoverMailService } from './RecoverMailService';

@Injectable()
export class RecoverService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly mailerService: RecoverMailService,
  ) {}

  async requestPasswordReset(email: string) {
    const user = await this.UserRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    //🔹 Guarda el token y le asigna una fecha de expiración 1 hora en el futuro.
    const token = uuidv4();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = dayjs().add(1, 'hour').toDate();
    await this.UserRepository.save(user);

    // ✅ Enviar correo al usuario
    await this.mailerService.sendRecoveryLink(user, token);

    return { message: 'Enlace de recuperación enviado al correo electrónico.' };
  }

  async resetPassword(token: string, newPassword: string) {
    //Busca un usuario cuyo token coincida y no esté expirado
    const user = await this.UserRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });

    if (!user) throw new BadRequestException('Token invalido o expirado');

    //Hashea la nueva contraseña
    user.password = await bcrypt.hash(newPassword, 10);

    // Limpia el token y su expiración para que no se pueda volver a usar.
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.UserRepository.save(user);

    return { message: 'La contraseña se ha restablecido correctamente.' };
  }
}
