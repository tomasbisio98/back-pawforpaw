import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';
import { Repository } from 'typeorm';
import { dogs, products } from './seeder';
@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async onApplicationBootstrap() {
    const dogsCount = await this.dogRepository.count();
    const productsCount = await this.productRepository.count();

    if (dogsCount === 0) {
      await this.dogRepository.save(dogs);
      console.log('🐶 Seed: 15 dogs insertados');
    }

    if (productsCount === 0) {
      await this.productRepository.save(products);
      console.log('📦 Seed: 15 productos insertados');
    }
  }
}
