import { Products } from 'src/products/entities/products.entity';
import { DataSource } from 'typeorm';

export const products: Partial<Products>[] = [
  {
    name: 'Collar resistente',
    price: 83.07,
    imgUrl: 'https://example.com/products/product1.jpg',
    status: true,
  },
  {
    name: 'Comida premium',
    price: 21.9,
    imgUrl: 'https://example.com/products/product2.jpg',
    status: true,
  },
  {
    name: 'Pelota de goma',
    price: 84.0,
    imgUrl: 'https://example.com/products/product3.jpg',
    status: true,
  },
  {
    name: 'Cama suave',
    price: 82.7,
    imgUrl: 'https://example.com/products/product4.jpg',
    status: true,
  },
  {
    name: 'Juguete interactivo',
    price: 12.88,
    imgUrl: 'https://example.com/products/product5.jpg',
    status: true,
  },
  {
    name: 'Correa extensible',
    price: 23.1,
    imgUrl: 'https://example.com/products/product6.jpg',
    status: true,
  },
  {
    name: 'Ropa de invierno',
    price: 39.64,
    imgUrl: 'https://example.com/products/product7.jpg',
    status: true,
  },
  {
    name: 'Champú hipoalergénico',
    price: 37.66,
    imgUrl: 'https://example.com/products/product8.jpg',
    status: true,
  },
  {
    name: 'Comedero doble',
    price: 12.38,
    imgUrl: 'https://example.com/products/product9.jpg',
    status: true,
  },
  {
    name: 'Cepillo para pelaje',
    price: 27.49,
    imgUrl: 'https://example.com/products/product10.jpg',
    status: true,
  },
  {
    name: 'Galletas naturales',
    price: 35.66,
    imgUrl: 'https://example.com/products/product11.jpg',
    status: true,
  },
  {
    name: 'Botella portátil de agua',
    price: 12.2,
    imgUrl: 'https://example.com/products/product12.jpg',
    status: true,
  },
  {
    name: 'Juguete mordedor',
    price: 43.48,
    imgUrl: 'https://example.com/products/product13.jpg',
    status: true,
  },
  {
    name: 'Arnés ajustable',
    price: 64.99,
    imgUrl: 'https://example.com/products/product14.jpg',
    status: true,
  },
  {
    name: 'Toalla absorbente',
    price: 41.91,
    imgUrl: 'https://example.com/products/product15.jpg',
    status: true,
  },
];

export async function seedProducts(dataSource: DataSource) {
  const repo = dataSource.getRepository(Products);
  const count = await repo.count();

  if (count === 0) {
    await repo.save(products);
    console.log('📦 Seed: productos insertados');
  }
}
