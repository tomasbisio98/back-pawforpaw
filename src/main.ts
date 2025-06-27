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
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // ✅ Excluye el webhook de ser parseado por bodyParser
  app.use('/stripe/webhook', express.raw({ type: 'application/json' }));

  // 4️⃣ JSON + URL-encoded bodies para todas las demás rutas
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
