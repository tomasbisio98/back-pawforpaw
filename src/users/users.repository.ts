import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

export class UserRepository {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ){}


    async get(page: number = 1, limit: number = 5): Promise<Partial<User>[]> {
        let users = await this.usersRepository.find();

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        
        users = users.slice(startIndex, endIndex);
        
        return users.map(({ password, ...user }) => user);
    };


    async getById(id: string): Promise<Partial<User>> {
        const user = await this.usersRepository.findOne({
            where: { id },
        });
        
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        
        const { password, isAdmin, ...userWithoutPassword } = user;
        
        return userWithoutPassword;
    };
    
    
    async getByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOne({ where: { email } });
        if (!user) return null;
        
        return user;
    };
    
    
    async createUser(user: Partial<User>): Promise<Partial<User>> {
        const newUser = await this.usersRepository.save(user);
        const { password, isAdmin, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    };
    
    
    async update(id: string, user: Partial<CreateUserDto>): Promise<Partial<User>> {
                
        await this.usersRepository.update(id, user);
        
        const updateUser = await this.usersRepository.findOneBy({ id });
        if (!updateUser) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }
        
        const { password, isAdmin, ...userWithoutPassword } = updateUser;
        
        return userWithoutPassword;
    
    };
    
    
    async delete(id: string): Promise<string> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }  
        await this.usersRepository.remove(user);
        return user.id;
    };

};