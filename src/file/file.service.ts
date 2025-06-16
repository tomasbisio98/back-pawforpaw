import { Injectable, NotFoundException } from '@nestjs/common';
import { FileRepository } from './file.repository'; // Repositorio que maneja subida de archivos
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/products.entity'; // Entidad de producto

@Injectable()
export class FilesService {
  constructor(
    private readonly fileRepository: FileRepository, // Encapsula la lógica de subida
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>, // Repositorio de productos
    // @InjectRepository(Dog)
    // private readonly dogsRepository: Repository<Dog>, // Repositorio de perros
  ) {}

  // Sube una imagen y la asigna al producto
  async uploadImage(file: Express.Multer.File, productId: string) {
    const product = await this.productsRepository.findOneBy({ productId });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const uploadResponse = await this.fileRepository.uploadImage(file);

    await this.productsRepository.update(productId, {
      imgUrl: uploadResponse.url,
    });

    return 'Imagen cargada';
  }
}
