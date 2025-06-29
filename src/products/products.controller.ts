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
  UseGuards
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { StatusGuard } from 'src/auth/guards/status.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //  Obtener lista paginada de productos
  @Get()
  @UseGuards(StatusGuard)
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('status') status?: string,
  ) {
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 9;
    const statusBool = status !== undefined ? status === 'true' : undefined;
    return this.productsService.getProducts(pageNum, limitNum, statusBool);
  }

  // Obtener un solo producto por su ID ( GET /products/:id )
  @Get(':id')
  @UseGuards(StatusGuard)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  // POST Crear un nuevo producto asociado a un perrito
  @Post()
  @UseGuards(StatusGuard)
  create(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  // Actualizar un producto por ID (Put/products/:id)
  @Put(':id')
  @UseGuards(StatusGuard)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, data);
  }

  // Eliminar un producto por ID (DELETE /products/:id)
  @Delete(':id')
  @UseGuards(StatusGuard)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.deactivateProduct(id);
  }
}
