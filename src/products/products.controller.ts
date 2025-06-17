import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //  Obtener lista paginada de productos
  @Get()
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 5;
    const statusBool = status === 'true';
    return this.productsService.getProducts(pageNum, limitNum, statusBool);
  }

  // Obtener un solo producto por su ID ( GET /products/:id )
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  // POST Crear un nuevo producto asociado a un perrito
  @Post()
  create(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  // Actualizar un producto por ID (Put/products/:id)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, data);
  }

  // Eliminar un producto por ID (DELETE /products/:id)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deactivateProduct(id);
  }
}
