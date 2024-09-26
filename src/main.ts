import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication | any>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  app.setGlobalPrefix('api/v3');
  // app.enableCors({
  //   origin: '*',
  //   methods: 'GET,PATCH,POST,DELETE',
  //   // allowedHeaders: 'Content-Type, Accept',
  // });

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     errorHttpStatusCode: 422,
  //   }),
  // );

  // app.useGlobalFilters(new HttpExceptionsFilter());
  // app.useStaticAssets({
  //   root: resolve(__dirname, '..', 'public'),
  //   prefix: '/public/',
  // });
  // // app.setViewEngine({
  // //   engine: {
  // //     handlebars: require('handlebars'),
  // //   },
  // //   templates: resolve(__dirname, '..', 'views/layouts'),
  // // });

  // const partialsDir = resolve(__dirname, '../views/templates');
  // const filenames = fs.readdirSync(partialsDir);

  // filenames.forEach((filename) => {
  //   const matches = /^([^.]+).hbs$/.exec(filename);
  //   if (!matches) {
  //     return;
  //   }
  //   const name = matches[1];
  //   const filepath = resolve(partialsDir, filename);
  //   const template = fs.readFileSync(filepath, 'utf8');
  //   Handlebars.registerPartial(name, template);
  // });

  // if (process.env.NODE_ENV === nodeEnv.development) {
  //   const config = new DocumentBuilder()
  //     .setTitle('X-NOM-035')
  //     .setDescription('Documentación de la API de X-NOM-035, versión 3.0.0')
  //     .setVersion('1.0')
  //     .addBearerAuth()
  //     .build();
  //   const document = SwaggerModule.createDocument(app, config);
  //   SwaggerModule.setup('api/v3/swagger', app, document);
  // }

  await app.listen(process.env.PORT || 3000, '127.0.0.1');
}
bootstrap();
