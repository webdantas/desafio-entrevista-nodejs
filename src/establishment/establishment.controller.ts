import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { Establishment } from './establishment.entity';
import { EstablishmentService } from './establishment.service';

@Controller('establishments')
export class EstablishmentController {
  constructor(private establishmentService: EstablishmentService) {}

  @Get()
  async findAll(): Promise<Establishment[]> {
    return this.establishmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Establishment | null> {
    const establishment = await this.establishmentService.findOne(id);
    if (!establishment) {
      throw new NotFoundException('Establishment not found');
    }
    return establishment;
  }


  @Post()
  async create(@Body() establishment: Establishment): Promise<Establishment> {
    return this.establishmentService.create(establishment);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() establishment: Establishment,
  ): Promise<Establishment> {
    const updatedEstablishment = await this.establishmentService.update(id, establishment);
    if (!updatedEstablishment) {
      throw new NotFoundException('Establishment not found');
    }
    return updatedEstablishment;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.establishmentService.delete(id);
  }
}
