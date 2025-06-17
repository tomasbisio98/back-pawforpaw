import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(private usersRepository: UserRepository) {}
  getUsers(page: number, limit: number): Promise<Partial<User>[]> {
    return this.usersRepository.get(page, limit);
  }

  getById(id: string) {
    return this.usersRepository.getById(id);
  }

  createUser(user: Partial<User>): Promise<Partial<User>> {
    return this.usersRepository.createUser(user);
  }

  update(id: string, updateUser: Partial<User>) {
    return this.usersRepository.update(id, updateUser);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
