import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { AssignProductsDto } from './dto/assing-products.dto';
import { Products } from 'src/products/entities/products.entity';
import { StatusGuard } from 'src/auth/guards/status.guard';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('gender') gender?: string,
    @Query('city') city?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sort') sort?: string,
    @Query('status') status?: string, // 👈 cambia el tipo a string
  ): Promise<{ data: Dog[]; total: number }> {
    return await this.dogsService.findAllWithFilters({
      name,
      gender,
      city,
      page: Number(page),
      limit: Number(limit),
      sort,
      status: status !== undefined ? status === 'true' : undefined, // ✅ parsea a boolean,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @Get(':id/products')
  getProductsByDog(
    @Param('id', ParseUUIDPipe) dogId: string,
  ): Promise<Products[]> {
    return this.dogsService.getProductsByDog(dogId);
  }

  @Post()
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    console.log('🎯 Datos recibidos:', createDogDto);
    return this.dogsService.create(createDogDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Patch(':id/products')
  assignProductsToDo(
    @Param('id', ParseUUIDPipe) dogId: string,
    @Body() assignProductsDto: AssignProductsDto,
  ): Promise<Dog> {
    return this.dogsService.assingProducts(dogId, assignProductsDto.productIds);
  }
}
