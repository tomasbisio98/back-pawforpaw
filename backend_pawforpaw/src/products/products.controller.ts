import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from './product.interface';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //  Obtener lista paginada de productos
  @Get()
  getProducts(@Query('page') page?: string, @Query('limit') limit?: string) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    return this.productsService.getProducts(pageNum, limitNum);
  }

  // Obtener un solo producto por su ID ( GET /products/:id )
  @Get(':id')
  findOne(@Param('id') id: string): Product {
    const product = this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  // POST Crear un nuevo producto asociado a un perrito
  @Post()
  create(@Body() dto: CreateProductDto): Product {
    return this.productsService.create(dto);
  }

  // Actualizar un producto por ID (Put/products/:id)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto): Product {
    try {
      return this.productsService.update(id, dto);
    } catch {
      throw new NotFoundException('Producto no encontrado para actualizar');
    }
  }

  // Eliminar un producto por ID (DELETE /products/:id)
  @Delete(':id')
  delete(@Param('id') id: string): { id: string } {
    try {
      this.productsService.delete(id);
      return { id };
    } catch {
      throw new NotFoundException('PProducto no encontrado para eliminar');
    }
  }
}
