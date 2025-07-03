import { Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(
    private usersRepository: UserRepository,
    private mailerService: MailerService,
  ) {}
  getUsers(
    page: number,
    limit: number,
    orderBy: 'name',
    order: 'asc' | 'desc' = 'asc',
    status?: 'activo' | 'inactivo',
  ) {
    return this.usersRepository.get(
      page,
      limit,
      orderBy,
      order, // 👈 así, sin toUpperCase
      status,
    );
  }
  getById(id: string) {
    return this.usersRepository.getById(id);
  }

  getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
  }

  createUser(user: Partial<User>): Promise<Partial<User>> {
    return this.usersRepository.createUser(user);
  }

  async update(id: string, updateUser: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');

    // 🚩 Detectamos si se está baneando ahora
    if (updateUser.isBanned === true && user.isBanned === false) {
      try {
        await this.mailerService.sendMail({
          to: user.email,
          subject: '🚫 Has sido baneado de PawForPaw',
          html: `
  <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
    <h2 style="color: #2A5559;">Hola ${user.name ?? 'usuario'},</h2>
    <p>Te informamos que tu cuenta ha sido <strong style="color: #d32f2f;">baneada</strong> de <strong>PawForPaw</strong>.</p>
    <p>Si crees que se trata de un error, por favor contáctate con nosotros a:</p>
    <p>
      <a href="mailto:pawforpaw2025@gmail.com" style="color: #2A5559; text-decoration: none; font-weight: bold;">
        pawforpaw2025@gmail.com
      </a>
    </p>
    <p>Gracias por comprender.</p>
    <p style="margin-top: 20px;">Saludos,<br>🐾 <strong>PawForPaw</strong></p>
  </div>
`,
        });
      } catch (error) {
        console.error('Error al enviar correo de banneo:', error);
        // Continuar sin interrumpir la actualización
      }
    }

    Object.assign(user, updateUser);
    return this.usersRepository.update(id, updateUser);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
