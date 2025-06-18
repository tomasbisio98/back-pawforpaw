import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipe Global de validacion
  app.useGlobalPipes(new ValidationPipe());
  // Middleware global para registrar todas las solicitudes HTTP
  app.use(loggerGlobal);

  // Aplica validaciones globales basadas en los DTOs
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
  console.log('hola');
}
bootstrap();
