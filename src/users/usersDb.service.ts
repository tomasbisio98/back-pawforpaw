import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersDbService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}

    saveUser(user: Partial<User>) {
        this.usersRepository.save(user);
    };
};