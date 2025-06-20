import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './file.repository'; // Repositorio que maneja subida de archivos
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/products.entity'; // Entidad de producto
import { User } from 'src/users/users.entity';
import { Dog } from 'src/dogs/entities/dog.entity';

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FileRepository, // Encapsula la lógica de subida
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>, // Repositorio de productos
    @InjectRepository(Dog)
    private readonly dogsRepository: Repository<Dog>, // Repositorio de perros
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Sube una imagen y la asigna al producto
  async uploadProductImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const uploadResponse = await this.fileRepository.uploadImage(file);

    await this.productsRepository.update(productId, {
      imgUrl: uploadResponse.secure_url,
    });

    return 'Imagen cargada';
  }

  // Sube una imagen y la asigna a un perrito
  async uploadDogImage(file: Express.Multer.File, dogId: string) {
    const dog = await this.dogsRepository.findOneBy({ dogId });
    if (!dog) {
      throw new NotFoundException('Perrito no encontrado');
    }

    const uploadResponse = await this.fileRepository.uploadImage(file);

    await this.dogsRepository.update(dogId, {
      imgUrl: uploadResponse.secure_url,
    });

    return 'Imagen cargada';
  }

  // Sube una imagen y la asigna a un usuario
  async uploadUserImage(file: Express.Multer.File, id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const uploadResponse = await this.fileRepository.uploadImage(file);

    await this.usersRepository.update(id, {
      profileImgUrl: uploadResponse.secure_url,
    });

    return 'Imagen cargada';
  }
}
