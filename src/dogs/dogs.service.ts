import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,
  ) {}

  async findAll(): Promise<Dog[]> {
    return await this.dogRepository.find();
  }

  async findOne(id: string): Promise<Dog> {
    const dog = await this.dogRepository.findOneBy({ dogId: id });
    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }
    return dog;
  }

  async create(createDogDto: CreateDogDto): Promise<Dog> {
    const newDog = this.dogRepository.create(createDogDto);
    return await this.dogRepository.save(newDog);
  }

  async update(id: string, updateDogDto: UpdateDogDto): Promise<Dog> {
    const dog = await this.dogRepository.preload({
      dogId: id,
      ...updateDogDto,
    });

    if (!dog) {
      throw new NotFoundException(`No fue encontrado un perro con este ${id}`);
    }
    return await this.dogRepository.save(dog);
  }
}
