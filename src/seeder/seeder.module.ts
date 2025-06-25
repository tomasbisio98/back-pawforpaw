import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeder.service';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/users.entity';
import { UserAdminSeeder } from './user-admin.seeder';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Products, User]), UsersModule],
  providers: [SeedService, UserAdminSeeder],
})
export class SeedModule {}
