import { Injectable } from '@nestjs/common';
import { Product } from './product.interface';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/createProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Injectable()
export class ProductsService {
  //simulo BD temporal
  private products: Product[] = [];

  create(dto: CreateProductDto): Product {
    const newProduct: Product = {
      id: uuidv4(),
      name: dto.name,
      price: dto.price,
      imageUrl: dto.imageUrl,
      status: true,
      dogId: dto.dogId,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  getProducts(page: number, limit: number): Product[] {
    const start = (page - 1) * limit;
    const end = start + limit;
    return this.products.slice(start, end);
  }

  //Obtener todos los productos asociados a un perrito
  findAllByDog(dogId: number): Product[] {
    return this.products.filter((product) => product.dogId === dogId);
  }

  //Obtener un solo producto por ID
  findOne(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  //Actualizar un producto por ID
  update(id: string, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    this.products[index] = { ...this.products[index], ...dto };
    return this.products[index];
  }

  // Eliminar un producto por ID
  delete(id: string): Product {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      throw new Error('Producto no encontrado');
    }
    const deleted = this.products[index];
    this.products.splice(index, 1);
    return deleted;
  }
}
