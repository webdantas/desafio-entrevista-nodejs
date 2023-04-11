import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repository: VehicleRepository,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Vehicle | null> {
    try {
      const vehicle = await this.repository.findOneOrFail({ where: { id } });
      return vehicle;
    } catch (err) {
      return null;
    }
  }

  async create(vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.repository.save(vehicle);
  }

  async update(id: number, vehicle: UpdateVehicleDto): Promise<Vehicle> {
    const existingVehicle = await this.findOne(id);
    if (!existingVehicle) {
      throw new Error('Vehicle not found');
    }

    const updatedVehicle = Object.assign(existingVehicle, vehicle);
    return this.repository.save(updatedVehicle);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
