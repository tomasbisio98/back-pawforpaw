import { Injectable } from '@nestjs/common';
import { NewsletterService } from '../newsletter/newsletter.service';
import { NewsletterSubscription } from '../newsletter/entities/subscription.entity';
import { Dog } from '../dogs/entities/dog.entity';

@Injectable()
export class NotificationsService {
  constructor(private readonly newsletterService: NewsletterService) {}

  async notifyNewDog(dog: Dog): Promise<void> {
    const subscribers: NewsletterSubscription[] =
      await this.newsletterService.getAllSubscribers();

    const html = `
      <h1>🐶 ¡Un nuevo amigo busca familia o de tu colaboración!</h1>
      <p><strong>Nombre:</strong> ${dog.name}</p>
      <p><strong>Sexo:</strong> ${dog.sex === 'M' ? 'Macho' : 'Hembra'}</p>
      <p><strong>Ciudad:</strong> ${dog.city}</p>
      <p><strong>Descripción:</strong> ${dog.description}</p>
      ${dog.imgUrl ? `<img src="${dog.imgUrl}" alt="${dog.name}" style="max-width: 100%;"/>` : ''}
    `;

    for (const subscriber of subscribers) {
      await this.newsletterService.sendCustomEmail(
        subscriber.email,
        '🐾 ¡Nuevo perrito en adopción!',
        html,
      );
    }
  }
}
