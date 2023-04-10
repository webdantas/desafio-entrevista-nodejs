import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleRepository } from './vehicle.repository';

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


  async create(vehicle: Vehicle): Promise<Vehicle> {
    return this.repository.save(vehicle);
  }

  async update(id: number, vehicle: Vehicle): Promise<Vehicle> {
    await this.repository.update(id, vehicle);
    return vehicle;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}