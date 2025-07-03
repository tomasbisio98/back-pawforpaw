import { Dog } from 'src/dogs/entities/dog.entity';
import { DataSource } from 'typeorm';
import { CreateDogDto } from 'src/dogs/dto/create-dog.dto';

const createdAt = new Date('2025-06-05T00:00:00Z');

export const dogs: (CreateDogDto & { createdAt: Date })[] = [
  {
    name: 'Rocky',
    sex: 'M',
    city: 'Cali',
    description: 'Le encanta correr en el parque.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323806/dog_1_vra6cz.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Bella',
    sex: 'H',
    city: 'Cartagena',
    description: 'Tranquilo y cariñoso.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323805/dog_2_evdpwx.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Simba',
    sex: 'M',
    city: 'Bogotá',
    description: 'Excelente guardián.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323804/dog_3_m8fzdk.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Nala',
    sex: 'H',
    city: 'Barranquilla',
    description: 'Busca un hogar lleno de amor.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323803/dog_4_yhour2.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Toby',
    sex: 'M',
    city: 'Pereira',
    description: 'Muy bien entrenado.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323802/dog_5_x3iae5.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Lola',
    sex: 'H',
    city: 'Villavicencio',
    description: 'Sociable con otros animales.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323801/dog_6_jtdfxl.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Zeus',
    sex: 'M',
    city: 'Bucaramanga',
    description: 'Cariñoso y protector.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323799/dog_7_pz5oqq.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Maya',
    sex: 'H',
    city: 'Ibagué',
    description: 'Muy activo y curioso.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323798/dog_8_zivqr8.jpg',
    status: false,
    createdAt,
  },
  {
    name: 'Thor',
    sex: 'M',
    city: 'Popayán',
    description: 'Amante de los paseos largos.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323797/dog_9_tqbplc.jpg',
    status: false,
    createdAt,
  },
  {
    name: 'Coco',
    sex: 'M',
    city: 'Manizales',
    description: 'Le encanta nadar.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323796/dog_10_urm1f4.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Bruno',
    sex: 'M',
    city: 'Neiva',
    description: 'Ideal para apartamentos.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323795/dog_11_wj4y3r.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Sasha',
    sex: 'H',
    city: 'Santa Marta',
    description: 'Inteligente y obediente.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323794/dog_12_twabop.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Duke',
    sex: 'M',
    city: 'Cúcuta',
    description: 'Juguetón y lleno de energía.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1751323794/dog_13_iv94nj.jpg',
    status: true,
    createdAt,
  },
];

export async function seedDogs(dataSource: DataSource) {
  const dogRepo = dataSource.getRepository(Dog);
  const count = await dogRepo.count();

  if (count === 0) {
    await dogRepo.save(dogs);
  }
}
