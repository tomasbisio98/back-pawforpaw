import { Products } from 'src/products/entities/products.entity';
import { DataSource } from 'typeorm';

export const products: Partial<Products>[] = [
  {
    name: 'Collar resistente',
    price: 83.07,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322531/Product_1_hn5thf.jpg',
    status: true,
  },
  {
    name: 'Comida premium',
    price: 21.9,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322530/Product_2_zii46c.jpg',
    status: true,
  },
  {
    name: 'Pelota de goma',
    price: 84.0,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322529/Product_3_zbxuja.jpg',
    status: true,
  },
  {
    name: 'Cama suave',
    price: 82.7,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322630/Product_4_b4cufw.jpg',
    status: true,
  },
  {
    name: 'Juguete interactivo',
    price: 12.88,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322529/Product_5_wgfnrb.jpg',
    status: true,
  },
  {
    name: 'Correa extensible',
    price: 23.1,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322528/Product_6_wg8bse.jpg',
    status: true,
  },
  {
    name: 'Ropa de invierno',
    price: 39.64,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322527/Product_7_ymicwq.jpg',
    status: true,
  },
  {
    name: 'Champú hipoalergénico',
    price: 37.66,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322527/Product_8_uplkk3.jpg',
    status: true,
  },
  {
    name: 'Comedero doble',
    price: 12.38,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322526/Product_9_asklzd.jpg',
    status: true,
  },
  {
    name: 'Cepillo para pelaje',
    price: 27.49,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322525/Product_10_tna9ur.jpg',
    status: true,
  },
  {
    name: 'Galletas naturales',
    price: 35.66,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322525/Product_11_nn604j.jpg',
    status: true,
  },
  {
    name: 'Botella portátil de agua',
    price: 12.2,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322524/Product_12_udulon.jpg',
    status: true,
  },
  {
    name: 'Juguete mordedor',
    price: 43.48,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322524/Product_13_wfmdaf.jpg',
    status: true,
  },
  {
    name: 'Arnés ajustable',
    price: 64.99,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322523/Product_14_n8kxry.jpg',
    status: true,
  },
  {
    name: 'Toalla absorbente',
    price: 41.91,
    imgUrl: 'https://res.cloudinary.com/dziccimdv/image/upload/v1751322523/Product_15_x7za9a.jpg',
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
