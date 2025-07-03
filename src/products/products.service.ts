import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productRepo: Repository<Products>,
  ) {}

  async getProducts(
    page = 1,
    limit = 20,
    status?: boolean,
  ): Promise<Products[]> {
    const where = status !== undefined ? { status } : {};
    return this.productRepo.find({
      where,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getProductById(id: string): Promise<Partial<Products>> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async createProduct(
    data: Partial<Products>,
  ): Promise<{ productId: string; message: string }> {
    const newProduct = this.productRepo.create({
      productId: uuidv4(),
      name: data.name,
      price: data.price,
      imgUrl: data.imgUrl || 'https://example.com/default.jpg',
      status: data.status ?? true,
    });

    const saved = await this.productRepo.save(newProduct);
    return {
      message: 'Producto creado exitosamente',
      productId: saved.productId,
    };
  }

  async updateProduct(
    id: string,
    data: Partial<Products>,
  ): Promise<{ id: string; message: string }> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    console.log('📥 Datos recibidos para actualizar:', data);
    const updated = Object.assign(product, data);
    await this.productRepo.save(updated);
    return {
      message: 'Producto modificado exitosamente!',
      id,
    };
  }

  async deactivateProduct(
    id: string,
  ): Promise<{ id: string; message: string }> {
    const product = await this.productRepo.findOne({
      where: { productId: id },
    });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }

    product.status = false;
    await this.productRepo.save(product);

    return {
      message: 'Producto eliminado exitosamente',
      id,
    };
  }
}
