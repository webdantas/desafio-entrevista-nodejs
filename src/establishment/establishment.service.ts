import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Establishment } from './establishment.entity';
import { Vehicle } from '../vehicle/vehicle.entity';
import { VehicleRepository } from '../vehicle/vehicle.repository';
import { CreateVehicleDto } from '../vehicle/dto/create-vehicle.dto';
import { Repository } from 'typeorm';

@Injectable()
export class EstablishmentService {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,
    private vehicleRepository: VehicleRepository,
  ) {}

  async findAll(): Promise<Establishment[]> {
    return this.establishmentRepository.find();
  }

  async findOne(id: number): Promise<Establishment | undefined | null> {
    const establishment = await this.establishmentRepository.findOne({ where: { id } });
    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }
    return establishment;
  }


  async addVehicleToEstablishment(
    establishmentId: number,
    createVehicleDto: CreateVehicleDto,
  ): Promise<Vehicle> {
    const establishment = await this.establishmentRepository.findOneOrFail({
      where: { id: establishmentId },
    });

    const vehicle = this.vehicleRepository.create(createVehicleDto);
    vehicle.establishment = establishment;
    return this.vehicleRepository.save(vehicle);
  }

  async findOneOrFail(id: number): Promise<Establishment | undefined> {
    try {
      const establishment = await this.establishmentRepository.findOneOrFail({ where: { id } });
      return establishment;
    } catch (err) {
      throw new NotFoundException('Establishment not found');
    }
  }

  async create(establishment: Establishment): Promise<Establishment> {
    return this.establishmentRepository.save(establishment);
  }

  async update(id: number, establishment: Establishment): Promise<Establishment | null> {
    const updateResult = await this.establishmentRepository.update(id, establishment);
    if (updateResult.affected === 0) {
      throw new BadRequestException('Update failed or no fields were updated');
    }
    const updatedEstablishment = await this.establishmentRepository.findOne({ where: { id } });

    return updatedEstablishment || null;
  }


  async delete(id: number): Promise<void> {
    await this.establishmentRepository.delete(id);
  }
}
