import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';

import { AppModule } from './app.module';
import { HttpExceptionsFilter, nodeEnv } from './config';

async function bootstrap() {
  //  TODO: Buscar mejora
  const app = await NestFactory.create<INestApplication | any>(AppModule);

  app.setGlobalPrefix('api/v3');
  app.enableCors({
    origin: '*',
    methods: 'GET,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Accept',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      errorHttpStatusCode: 422,
    }),
  );

  app.useGlobalFilters(new HttpExceptionsFilter());

  app.useStaticAssets(resolve(__dirname, '..', 'public'));
  app.setBaseViewsDir(resolve(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');

  if (process.env.NODE_ENV === nodeEnv.development) {
    const config = new DocumentBuilder()
      .setTitle('X-NOM-035')
      .setDescription('Documentación de la API de X-NOM-035, versión 3.0.0')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v3/swagger', app, document);
  }

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
