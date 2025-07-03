import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAdminSeeder {
  constructor(private readonly userService: UserService) {}

  async run() {
    const email = 'useradmin@pawforpaw.com.co';

    const existingUser = await this.userService.getByEmail(email);
    if (existingUser) {
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin_123', 10);

    await this.userService.createUser({
      name: 'Usuario Administrador',
      email,
      password: hashedPassword,
      phone: '3224129745',
      isAdmin: true,
    });
  }
}
