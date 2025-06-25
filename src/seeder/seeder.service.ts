import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import { dogs, products, users } from './seeder';
import { User } from 'src/users/users.entity';
import { UserAdminSeeder } from './user-admin.seeder';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userAdminSeeder: UserAdminSeeder,
  ) {}

  async onApplicationBootstrap() {
    const dogsCount = await this.dogRepository.count();
    const productsCount = await this.productRepository.count();
    const usersCount = await this.userRepository.count();

    if (dogsCount === 0) {
      await this.dogRepository.save(dogs);
      console.log('🐶 Seed: 15 dogs insertados');
    }

    if (productsCount === 0) {
      await this.productRepository.save(products);
      console.log('📦 Seed: 15 productos insertados');
    }

    if (usersCount === 0) {
      await this.userRepository.save(users);
      console.log('👩🏻‍💻 Seed: 15 usuarios insertados');
    }

    await this.userAdminSeeder.run();
  }
}
