import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeder.service';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/users.entity';
import { NewsletterSubscription } from '../newsletter/entities/subscription.entity'; // 👈 nuevo import
import { UserAdminSeeder } from './user-admin.seeder';
import { UsersModule } from 'src/users/users.module';
import { DogProductSeeder } from './dog-product.seeder'; // 👈 seeder de relación perro-producto

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Dog,
      Products,
      User,
      NewsletterSubscription, // 👈 agregado aquí
    ]),
    UsersModule,
  ],
  providers: [SeedService, UserAdminSeeder, DogProductSeeder],
})
export class SeedModule {}
