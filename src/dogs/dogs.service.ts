import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { Repository, ILike } from 'typeorm';
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
    const dog = await this.dogRepository.findOne({
      where: { dogId: id },
      relations: ['products'], // 👈 incluye los productos asignados
    });

    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }

    return dog;
  }

  async getProductsByDog(dogId: string): Promise<Products[]> {
    const dog = await this.dogRepository.findOne({
      where: { dogId },
      relations: ['products'],
    });

    if (!dog) throw new NotFoundException('Perrito no encontrado');

    return dog.products;
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

    const nuevosProductos = await this.productsRepository.findByIds(productIds);

    // Evitar duplicados comparando por ID
    const productosExistentes = dog.products ?? [];

    const productosFinales = [
      ...productosExistentes,
      ...nuevosProductos.filter(
        (nuevo) =>
          !productosExistentes.some(
            (existente) => existente.productId === nuevo.productId,
          ),
      ),
    ];

    dog.products = productosFinales;

    return await this.dogRepository.save(dog);
  }

  async findAllWithFilters({
    name,
    gender,
    city,
    page = 1,
    limit = 9,
    sort,
  }: {
    name?: string;
    gender?: string;
    city?: string;
    page: number;
    limit: number;
    sort?: string;
  }): Promise<{ data: Dog[]; total: number }> {
    const where: any = {};

    if (name) {
      where.name = ILike(`%${name}%`);
    }

    if (gender) {
      where.sex = gender;
    }

    if (city) {
      where.city = ILike(`%${city}%`);
    }
    let order: any = { createdAt: 'DESC' };
    if (sort === 'name') {
      order = { name: 'ASC' };
    }

    const [data, total] = await this.dogRepository.findAndCount({
      where,
      take: limit,
      skip: (page - 1) * limit,
      order,
    });

    return { data, total };
  }
}
