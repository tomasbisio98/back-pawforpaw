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

  async findAll({
    page = 1,
    limit = 10,
  }: {
    page?: number;
    limit?: number;
  }): Promise<{ data: Dog[]; total: number }> {
    // 1️⃣ Obtener activos ordenados por fecha descendente
    const activeDogs = await this.dogRepository.find({
      where: { status: true },
      order: { createdAt: 'DESC' },
    });

    // 2️⃣ Obtener inactivos ordenados por fecha descendente
    const inactiveDogs = await this.dogRepository.find({
      where: { status: false },
      order: { createdAt: 'DESC' },
    });

    // 3️⃣ Concatenar activos + inactivos
    const allDogs = [...activeDogs, ...inactiveDogs];

    // 4️⃣ Calcular índices de paginación
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    // 5️⃣ Obtener datos paginados
    const data = allDogs.slice(startIndex, endIndex);

    // 6️⃣ Devolver con el total correcto
    return { data, total: allDogs.length };
  }

  async findOne(id: string, onlyActiveProducts = false): Promise<Dog> {
    const dog = await this.dogRepository.findOne({
      where: { dogId: id },
      relations: ['products'],
    });

    if (!dog) {
      throw new NotFoundException(`Dog with id ${id} not found`);
    }

    if (onlyActiveProducts) {
      dog.products = dog.products.filter((product) => product.status === true);
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
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; background-color: #ffffff; color: #333333; border-radius: 8px;">
        <h2 style="color: #2c3e50; text-align: center;">🐾 Conocé a ${savedDog.name} y a todos nuestros perritos!</h2>
        <p style="font-size: 16px; line-height: 1.5;"><strong>📍 Ciudad:</strong> ${savedDog.city}</p>
        <p style="font-size: 16px; line-height: 1.5;"><strong>📝 Descripción:</strong> ${savedDog.description}</p>
        <p style="font-size: 16px; line-height: 1.5;">Visita nuestra web para conocer más o colaborar con su causa.</p>
        <div style="text-align: center; margin-top: 20px;">
          <a href="https://front-pawforpaw-one.vercel.app/perritos" style="background-color: #e67e22; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold; display: inline-block;">Conocer a ${savedDog.name}</a>
        </div>
      </div>
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
    status,
  }: {
    name?: string;
    gender?: string;
    city?: string;
    page: number;
    limit: number;
    sort?: string;
    status?: boolean;
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

    if (status === true) {
      where.status = true;
    } else if (status === false) {
      where.status = false;
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
