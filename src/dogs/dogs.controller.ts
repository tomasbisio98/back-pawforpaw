import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { Dog } from './entities/dog.entity';
import { AssignProductsDto } from './dto/assing-products.dto';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  async findAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Dog> {
    return this.dogsService.findOne(id);
  }

  @Post()
  create(@Body() createDogDto: CreateDogDto): Promise<Dog> {
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
