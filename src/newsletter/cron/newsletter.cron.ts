import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { MoreThan, Repository } from 'typeorm';
import { NewsletterService } from '../newsletter.service';

@Injectable()
export class NewsletterCron {
  constructor(
    @InjectRepository(Dog)
    private readonly dogRepo: Repository<Dog>,
    private readonly newsletterService: NewsletterService,
  ) {}

  @Cron('0 10 * * 2') // Todos los martes a las 10:00 AM
  async handleWeeklyDogReport() {
    await this.sendWeeklyDogReport();
  }

  async sendWeeklyDogReport() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const recentDogs = await this.dogRepo.find({
      where: { createdAt: MoreThan(oneWeekAgo) },
    });

    if (recentDogs.length === 0) return;

    const html = `
      <h2>🐶 Perros agregados esta semana:</h2>
      <ul>
        ${recentDogs
          .map(
            (dog) =>
              `<li><strong>${dog.name}</strong> – ${dog.city}<br/>${dog.description}</li>`,
          )
          .join('')}
      </ul>
    `;

    const subscribers = await this.newsletterService.getAllSubscribers();

    for (const user of subscribers) {
      await this.newsletterService.sendCustomEmail(
        user.email,
        '🐾 Novedades semanales de nuestros perritos',
        html,
      );
    }
  }
}
