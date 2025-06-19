import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // Pipe global de validación basado en los DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS por si estás usando Insomnia, frontend o APIs externas
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
