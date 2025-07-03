import {
  Body,
  Controller,
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
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products with their details' })
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

  @Get(':id')
  @ApiOperation({ summary: 'Get One Product by Id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsService.getProductById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  create(@Body() product: CreateProductDto) {
    return this.productsService.createProduct(product);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, data);
  }
}
