import { Products } from 'src/products/entities/products.entity';
import { DataSource } from 'typeorm';

export const products: Partial<Products>[] = [
  {
    name: 'Collar resistente',
    price: 83.07,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322531/Product_1_hn5thf.jpg',
    status: true,
  },
  {
    name: 'Comida premium',
    price: 21.9,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322530/Product_2_zii46c.jpg',
    status: true,
  },
  {
    name: 'Pelota de goma',
    price: 84.0,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322529/Product_3_zbxuja.jpg',
    status: true,
  },
  {
    name: 'Cama suave',
    price: 82.7,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322630/Product_4_b4cufw.jpg',
    status: true,
  },
  {
    name: 'Juguete interactivo',
    price: 12.88,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322529/Product_5_wgfnrb.jpg',
    status: true,
  },
  {
    name: 'Correa extensible',
    price: 23.1,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322528/Product_6_wg8bse.jpg',
    status: true,
  },
  {
    name: 'Ropa de invierno',
    price: 39.64,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322527/Product_7_ymicwq.jpg',
    status: true,
  },
  {
    name: 'Champú hipoalergénico',
    price: 37.66,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322527/Product_8_uplkk3.jpg',
    status: true,
  },
  {
    name: 'Comedero doble',
    price: 12.38,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322526/Product_9_asklzd.jpg',
    status: true,
  },
  {
    name: 'Cepillo para pelaje',
    price: 27.49,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322525/Product_10_tna9ur.jpg',
    status: true,
  },
  {
    name: 'Galletas naturales',
    price: 35.66,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322525/Product_11_nn604j.jpg',
    status: true,
  },
  {
    name: 'Botella portátil de agua',
    price: 12.2,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322524/Product_12_udulon.jpg',
    status: true,
  },
  {
    name: 'Juguete mordedor',
    price: 43.48,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322524/Product_13_wfmdaf.jpg',
    status: true,
  },
  {
    name: 'Arnés ajustable',
    price: 64.99,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322523/Product_14_n8kxry.jpg',
    status: true,
  },
  {
    name: 'Toalla absorbente',
    price: 41.91,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751322523/Product_15_x7za9a.jpg',
    status: true,
  },
  {
    name: 'Bocaditos galletas originales para perritos',
    price: 9.71,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488004/Product_16_xj9p3e.jpg',
    status: true,
  },
  {
    name: 'Galletas artesanales para perritos',
    price: 15.11,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488004/Product_17_iupgea.jpg',
    status: true,
  },
  {
    name: 'Jabón arbol de té para perritos',
    price: 8.64,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488004/Product_18_jmstwe.jpg',
    status: true,
  },
  {
    name: 'Caldo de huesos - suplemento para perritos',
    price: 16.85,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488000/Product_19_q7gfkc.jpg',
    status: true,
  },
  {
    name: 'Alimento humedo para perritos sabor a carne',
    price: 13.91,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488000/Product_20_doywzx.jpg',
    status: true,
  },
  {
    name: 'Crudo de pollo - BARF para perritos',
    price: 16.85,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488000/Product_21_d7mq8g.jpg',
    status: true,
  },
  {
    name: 'Snack mini huesos con sabores surtidos para perros',
    price: 10.85,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488000/Product_22_p37b7f.jpg',
    status: true,
  },
  {
    name: 'Juguete de peluche',
    price: 25.91,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487999/Product_23_tmkovn.jpg',
    status: true,
  },
  {
    name: 'Juguete de peluche sapito',
    price: 23.62,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487999/Product_24_swviav.jpg',
    status: true,
  },
  {
    name: 'Juguete de peluche cactus',
    price: 25.62,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487993/Product_25_d7ol0o.jpg',
    status: true,
  },
  {
    name: 'Juguete de peluche nacho',
    price: 13.13,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487993/Product_26_qgokgw.jpg',
    status: true,
  },
  {
    name: 'juguete interactivo porta snack',
    price: 16.91,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487993/Product_27_nm3fvp.jpg',
    status: true,
  },
  {
    name: 'Juguete porta snack naranja',
    price: 21.91,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487993/Product_28_m42rpa.jpg',
    status: true,
  },
  {
    name: 'Helado chorizo para perro',
    price: 4.24,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487993/Product_29_jgyhjf.jpg',
    status: true,
  },
  {
    name: 'Juguete pelota blanda aroma a tocineta',
    price: 14.13,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487992/Product_30_bisazw.jpg',
    status: true,
  },
  {
    name: 'Juguete PET STAR treats entrenamiento',
    price: 15.0,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751488449/Product_40_yxhwbf.jpg',
    status: true,
  },
  {
    name: 'Suplemento natural 60 unidades',
    price: 22.13,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487992/Product_31_qw0m2y.jpg',
    status: true,
  },
  {
    name: 'Shampoo seco + manopla',
    price: 20.0,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487992/Product_32_s1tdxb.jpg',
    status: true,
  },
  {
    name: 'Peluche para perro resistente a mordeduras',
    price: 22.13,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487992/Product_33_ywoi7p.jpg',
    status: true,
  },
  {
    name: 'Juguete mordedor ultra fuerte para perritos',
    price: 18.13,
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751487992/Product_34_vemact.jpg',
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
