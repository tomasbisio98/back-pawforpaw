import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { Repository, DataSource } from 'typeorm';
import { dogs, products, users } from './seeder';
import { User } from 'src/users/users.entity';
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async onApplicationBootstrap() {
    const environment = process.env.NODE_ENV || 'development';

    if (environment === 'development') {
      // OPCIONAL: reset completo para desarrollo
      await this.dataSource.query(`
      TRUNCATE TABLE donations, products, dogs, users RESTART IDENTITY CASCADE
    `);
      console.log('🧹 Base de datos limpiada');
    }

    // Insertar solo si está vacío
    const dogsCount = await this.dogRepository.count();
    const usersCount = await this.userRepository.count();
    const productsCount = await this.productRepository.count();

    if (dogsCount === 0) {
      await this.dogRepository.save(dogs);
      console.log('🌱 Seed: 15 dogs insertados');
    }

    if (productsCount === 0) {
      await this.productRepository.save(products);
      console.log('🌱 Seed: 15 products insertados');
    }

    if (usersCount === 0) {
      await this.userRepository.save(users);
      console.log('🌱 Seed: 15 users insertados');
    }

    console.log('✅ SeederService completado');
  }
}
