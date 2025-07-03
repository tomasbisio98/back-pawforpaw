import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // 1️⃣ Desactivar el bodyParser integrado de Nest
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PI BACKEND')
    .setVersion('1.0.0')
    .setDescription(
      'API para la gestión de perritos en adopción, productos disponibles para donación, usuarios y suscripciones a newsletter. Permite administrar de forma eficiente los procesos de alta, consulta, actualización y baja, facilitando el seguimiento de las donaciones y el estado de cada perrito dentro de la fundación',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // 2️⃣ Middleware y validación global
  app.use(loggerGlobal);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    '/stripe/webhook',
    express.raw({ type: 'application/json', limit: '1mb' }),
  );

  // 4️⃣ JSON + URL-encoded bodies para todas las demás rutas
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
