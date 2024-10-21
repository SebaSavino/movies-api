import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { User } from './users/user.schema';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const validationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  app.useGlobalPipes(validationPipe);

  const config = new DocumentBuilder()
    .setTitle('Movies API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [User],
    });

  SwaggerModule.setup('docs', app, documentFactory, {
    customSiteTitle: 'Movies API | Documentation',
    useGlobalPrefix: false,
  });

  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
