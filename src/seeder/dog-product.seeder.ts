import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Products } from 'src/products/entities/products.entity';

@Injectable()
export class DogProductSeeder {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,

    @InjectRepository(Products)
    private readonly productRepository: Repository<Products>,
  ) {}

  async run() {
    const dogs = await this.dogRepository.find();
    const products = await this.productRepository.find();

    if (!dogs.length || !products.length) {
      console.log('⚠️ No hay perros o productos para asignar.');
      return;
    }

    for (const dog of dogs) {
      const cantidad = Math.floor(Math.random() * 4) + 1;
      const productosAleatorios = products
        .sort(() => 0.5 - Math.random())
        .slice(0, cantidad);

      dog.products = productosAleatorios;
      await this.dogRepository.save(dog);
    }

    console.log('🔗 Productos asignados aleatoriamente a los perritos.');
  }
}
