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
  @UseGuards(StatusGuard)
  async findAll(
    @Query('name') name?: string,
    @Query('gender') gender?: string,
    @Query('city') city?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 9,
  ): Promise<{ data: Dog[]; total: number }> {
    return await this.dogsService.findAllWithFilters({
      name,
      gender,
      city,
      page: +page,
      limit: +limit,
    });
  }

  @Get(':id')
  @UseGuards(StatusGuard)
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @Get(':id/products')
  @UseGuards(StatusGuard)
  getProductsByDog(
    @Param('id', ParseUUIDPipe) dogId: string,
  ): Promise<Products[]> {
    return this.dogsService.getProductsByDog(dogId);
  }

  @Post()
  @UseGuards(StatusGuard)
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
    return this.dogsService.create(createDogDto);
  }

  @Put(':id')
  @UseGuards(StatusGuard)
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.update(id, updateDogDto);
  }

  @Patch(':id/products')
  @UseGuards(StatusGuard)
  assignProductsToDo(
    @Param('id', ParseUUIDPipe) dogId: string,
    @Body() assignProductsDto: AssignProductsDto,
  ): Promise<Dog> {
    return this.dogsService.assingProducts(dogId, assignProductsDto.productIds);
  }
}
