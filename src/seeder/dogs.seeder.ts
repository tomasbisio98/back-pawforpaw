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
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Bella',
    sex: 'H',
    city: 'Cartagena',
    description: 'Tranquilo y cariñoso.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Simba',
    sex: 'M',
    city: 'Bogotá',
    description: 'Excelente guardián.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Nala',
    sex: 'H',
    city: 'Barranquilla',
    description: 'Busca un hogar lleno de amor.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Toby',
    sex: 'M',
    city: 'Pereira',
    description: 'Muy bien entrenado.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Lola',
    sex: 'H',
    city: 'Villavicencio',
    description: 'Sociable con otros animales.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Zeus',
    sex: 'M',
    city: 'Bucaramanga',
    description: 'Cariñoso y protector.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Maya',
    sex: 'H',
    city: 'Ibagué',
    description: 'Muy activo y curioso.',
    imgUrl:
      'https://cloudfront-us-east-1.images.arcpublishing.com/elespectador/RLZTHM2WVBBNLKJAEILFK4KVEY.jpg',
    status: false,
    createdAt,
  },
  {
    name: 'Thor',
    sex: 'M',
    city: 'Popayán',
    description: 'Amante de los paseos largos.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: false,
    createdAt,
  },
  {
    name: 'Coco',
    sex: 'M',
    city: 'Manizales',
    description: 'Le encanta nadar.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Bruno',
    sex: 'M',
    city: 'Neiva',
    description: 'Ideal para apartamentos.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Sasha',
    sex: 'H',
    city: 'Santa Marta',
    description: 'Inteligente y obediente.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
  {
    name: 'Duke',
    sex: 'M',
    city: 'Cúcuta',
    description: 'Juguetón y lleno de energía.',
    imgUrl:
      'https://res.cloudinary.com/dziccimdv/image/upload/v1750368912/qzbjainapl7efaunroc6.jpg',
    status: true,
    createdAt,
  },
];

export async function seedDogs(dataSource: DataSource) {
  const dogRepo = dataSource.getRepository(Dog);
  const count = await dogRepo.count();

  if (count === 0) {
    await dogRepo.save(dogs);
    console.log('🐶 Seed: dogs insertados');
  }
}
