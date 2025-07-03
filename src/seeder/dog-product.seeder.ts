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
      return;
    }

    let productosDisponibles = [...products];

    for (const dog of dogs) {
      if (productosDisponibles.length === 0) break;

      const cantidad = Math.floor(Math.random() * 4) + 1;
      const maxCantidad = Math.min(cantidad, productosDisponibles.length);

      const productosAleatorios = productosDisponibles
        .sort(() => 0.5 - Math.random())
        .slice(0, maxCantidad);

      dog.products = productosAleatorios;
      await this.dogRepository.save(dog);

      // Eliminar productos ya asignados
      productosDisponibles = productosDisponibles.filter(
        (p) => !productosAleatorios.includes(p),
      );
    }
  }
}
