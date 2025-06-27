import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from '../dogs/entities/dog.entity';
import { Products } from '../products/entities/products.entity';
import { Repository } from 'typeorm';
import { users } from './users.seeder';
import { User } from '../users/users.entity';
import { UserAdminSeeder } from './user-admin.seeder';
import * as bcrypt from 'bcrypt';
import { DogProductSeeder } from './dog-product.seeder';
import { NewsletterSubscription } from 'src/newsletter/entities/subscription.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,

    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(NewsletterSubscription)
    private readonly newsletterRepository: Repository<NewsletterSubscription>,

    private readonly userAdminSeeder: UserAdminSeeder,
    private readonly dogProductSeeder: DogProductSeeder,
  ) {}

  async onApplicationBootstrap() {
    const dogsCount = await this.dogRepository.count();
    const productsCount = await this.productRepository.count();
    const usersCount = await this.userRepository.count();

    if (dogsCount === 0) {
      // Make sure the path and export are correct
      const { dogs } = await import('./dogs.seeder');
      await this.dogRepository.save(dogs);
      console.log('🐶 Seed: 15 dogs insertados');
    }

    if (productsCount === 0) {
      const { products } = await import('./products.seeder');
      await this.productRepository.save(products);
      console.log('📦 Seed: 15 productos insertados');
    }

    if (usersCount === 0) {
      const hashedUsers = await Promise.all(
        users.map(async (user) => ({
          ...user,
          password: await bcrypt.hash(user.password ?? '', 10),
        })),
      );

      await this.userRepository.save(hashedUsers);
      console.log('👩🏻‍💻 Seed: 15 usuarios con contraseñas hasheadas insertados');
    }

    await this.userAdminSeeder.run();
    await this.dogProductSeeder.run();

    const newsletterCount = await this.newsletterRepository.count();

    if (newsletterCount === 0) {
      const { newsletterSubscribers } = await import(
        './newsletter-subscribers.seeder'
      );
      await this.newsletterRepository.save(newsletterSubscribers);
      console.log('📧 Seed: 6 suscriptores insertados');
    }
  }
}
