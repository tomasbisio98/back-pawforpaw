import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as express from 'express';

async function bootstrap() {
  // 1️⃣ Desactivar el bodyParser integrado de Nest
  const app = await NestFactory.create(AppModule, { bodyParser: false });

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
    origin: [
      'http://localhost:3000',
      'https://front-pawforpaw.vercel.app', // tu producción
      'https://front-pawforpaw-git-dev-tomas-bisios-projects-736cb191.vercel.app', // tu rama dev en Vercel
    ],
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
