import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity()
export class Establishment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cnpj!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column()
  motorcycleSpaces!: number;

  @Column()
  carSpaces!: number;

  @OneToMany(() => Vehicle, vehicle => vehicle.establishment)
  vehicles!: Vehicle[];

  constructor(data: Partial<Establishment>) {
    Object.assign(this, data);
  }
}
