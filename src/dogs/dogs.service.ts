import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/products/entities/products.entity';
import { NewsletterService } from 'src/newsletter/newsletter.service';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepository: Repository<Dog>,

    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,

    private readonly newsletterService: NewsletterService,
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
    const savedDog = await this.dogRepository.save(newDog);

    const subscribers = await this.newsletterService.getAllSubscribers();

    const emailPromises = subscribers.map((sub) =>
      this.newsletterService.sendCustomEmail(
        sub.email,
        `🐶 ¡Nuevo perrito necesita ayuda: ${savedDog.name}!`,
        `
          <h2>Conocé a ${savedDog.name}</h2>
          <p><strong>Ciudad:</strong> ${savedDog.city}</p>
          <p><strong>Descripción:</strong> ${savedDog.description}</p>
          <p>Visita nuestra web para conocer más o colaborar con su causa.</p>
        `,
      ),
    );

    await Promise.all(emailPromises);

    return savedDog;
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

  async assingProducts(dogId: string, productIds: string[]): Promise<Dog> {
    const dog = await this.dogRepository.findOne({
      where: { dogId },
      relations: ['products'],
    });
    if (!dog) throw new NotFoundException('Perrito no encontrado');

    const products = await this.productsRepository.findByIds(productIds);
    dog.products = products;

    return await this.dogRepository.save(dog);
  }
}
