import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
<<<<<<< Updated upstream
=======
// import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
>>>>>>> Stashed changes

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {}

  // Listar productos con paginación
  async getProducts(
    page: number,
    limit: number,
    status?: boolean,
  ): Promise<Products[]> {
    const where = status !== undefined ? { status } : {};
    return this.productRepo.find({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  //Obtener un solo producto por ID
  async getProductById(id: string): Promise<Partial<Products>> {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  //Obtener productos por perrito (dogId)
  async findAllByDog(dogId: number): Promise<Products[]> {
    return this.productRepo.find({ where: { dogId } });
  }

  // Crear producto nuevo y asociarlo a su categoría
  async createProduct(
    data: Partial<Products>,
  ): Promise<{ id: string; message: string }> {
    const newProduct = this.productRepo.create({
      id: uuidv4(),
      name: data.name,
      price: data.price,
      imgUrl: data.imgUrl || 'https://example.com/default.jpg',
      status: data.status ?? true,
      dogId: data.dogId,
    });

    const saved = await this.productRepo.save(newProduct);
    return {
      message: 'Producto creado exitosamente',
      id: saved.id,
    };
  }

  //Actualizar un producto por ID
  async updateProduct(
    id: string,
    data: Partial<Products>,
  ): Promise<{ id: string; message: string }> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Producto no encontrado');
    const updated = Object.assign(product, data);
    await this.productRepo.save(updated);
    return {
      message: 'Producto modificado exitosamente!',
      id,
    };
  }

  // Eliminar un producto por ID
  async deactivateProduct(
    id: string,
  ): Promise<{ id: string; message: string }> {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    product.status = false; // Marcar como inactivo
    await this.productRepo.save(product); // Guardar cambios

    return {
      message: 'Producto eliminado exitosamente',
      id,
    };
  }
}
