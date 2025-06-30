import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}
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

  update(id: string, updateUser: UpdateUserDto) {
    return this.usersRepository.update(id, updateUser);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
