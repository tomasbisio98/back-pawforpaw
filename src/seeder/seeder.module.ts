import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeder.service';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, Products, User])],
  providers: [SeedService],
})
export class SeedModule {}
