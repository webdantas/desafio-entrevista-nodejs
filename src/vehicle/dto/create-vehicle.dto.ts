import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  public brand: string;

  @IsString()
  @IsNotEmpty()
  public model: string;

  @IsString()
  @IsNotEmpty()
  public color: string;

  @IsString()
  @IsNotEmpty()
  public plate: string;

  @IsString()
  @IsNotEmpty()
  public type: string;

  constructor(brand: string, model: string, color: string, plate: string, type: string) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.plate = plate;
    this.type = type;
  }
}
