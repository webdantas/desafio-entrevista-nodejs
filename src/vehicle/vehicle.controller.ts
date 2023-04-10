import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Vehicle } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'Return all vehicles.'})
  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Get a vehicle by ID' })
  @ApiResponse({ status: 200, description: 'Return a vehicle.'})
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Vehicle | null> {
    const vehicle = await this.vehicleService.findOne(id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }


  @ApiOperation({ summary: 'Create a vehicle' })
  @ApiResponse({ status: 201, description: 'The vehicle has been successfully created.'})
  @Post()
  async create(@Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleService.create(vehicle);
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiResponse({ status: 200, description: 'The vehicle has been successfully updated.'})
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() vehicle: Vehicle): Promise<Vehicle> {
    return this.vehicleService.update(id, vehicle);
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiResponse({ status: 204, description: 'The vehicle has been successfully deleted.'})
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.vehicleService.delete(id);
  }
}
