import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Parking API')
    .setDescription('API for managing a parking lot of cars and motorcycles.')
    .setVersion('1.0')
    .addTag('vehicle')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
