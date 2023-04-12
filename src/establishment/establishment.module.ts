import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Establishment } from './establishment.entity';
import { EstablishmentRepository } from './establishment.repository';
import { EstablishmentService } from './establishment.service';
import { EstablishmentController } from './establishment.controller';
import { VehicleModule } from '../vehicle/vehicle.module'; // Importe o VehicleModule
import { VehicleRepository } from '../vehicle/vehicle.repository'; // Importe o VehicleRepository

@Module({
  imports: [
    TypeOrmModule.forFeature([Establishment, EstablishmentRepository]),
    VehicleModule, // Adicione o VehicleModule aqui
  ],
  providers: [EstablishmentService, VehicleRepository], // Adicione o VehicleRepository aqui
  controllers: [EstablishmentController],
})
export class EstablishmentModule {}
