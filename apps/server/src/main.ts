import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const config = app.get(ConfigService);
  app.enableCors(config.get('cors'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true
    })
  );
  await app.register(fastifyCookie, { secret: config.get('key') });
  await app.register(helmet);
  await app.listen(config.get('port'), '0.0.0.0');
}

bootstrap();
