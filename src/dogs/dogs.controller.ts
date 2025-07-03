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
import { ApiOperation } from '@nestjs/swagger';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('gender') gender?: string,
    @Query('city') city?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 9,
    @Query('sort') sort?: string,
  ): Promise<{ data: Dog[]; total: number }> {
    return await this.dogsService.findAllWithFilters({
      name,
      gender,
      city,
      page: +page,
      limit: +limit,
      sort,
    });
  }

  @ApiOperation({ summary: 'Get a dog by Id' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @ApiOperation({ summary: 'Get products Associated with an specific dog' })
  @Get(':id/products')
  getProductsByDog(
    @Param('id', ParseUUIDPipe) dogId: string,
  ): Promise<Products[]> {
    return this.dogsService.getProductsByDog(dogId);
  }

  @ApiOperation({ summary: 'Create a new Dog' })
  @Post()
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    console.log('🎯 Datos recibidos:', createDogDto);
    return this.dogsService.create(createDogDto);
  }

  @ApiOperation({ summary: 'Update a dog' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @ApiOperation({ summary: 'Assign a product to an specific dog' })
  @Patch(':id/products')
  assignProductsToDo(
    @Param('id', ParseUUIDPipe) dogId: string,
    @Body() assignProductsDto: AssignProductsDto,
  ): Promise<Dog> {
    return this.dogsService.assingProducts(dogId, assignProductsDto.productIds);
  }
}
