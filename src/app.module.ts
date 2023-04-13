import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle/vehicle.entity';
import { Establishment } from './establishment/establishment.entity';
import { EstablishmentModule } from './establishment/establishment.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'parking',
      entities: [Vehicle, Establishment],
      synchronize: true,
    }),
    EstablishmentModule,
    AuthModule,
    UsersModule.forRoot(),
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Parking API')
        .setDescription('API for managing a parking lot of cars and motorcycles.')
        .setVersion('1.0')
        .addTag('vehicle')
        .addTag('users')
        .build(),
      {
        include: [UsersModule],
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
