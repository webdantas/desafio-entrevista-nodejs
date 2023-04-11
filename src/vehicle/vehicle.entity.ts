// vehicle.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from '../establishment/establishment.entity';

@Entity()
export class Vehicle {
    constructor(id: number, brand: string, model: string, color: string, plate: string, type: string, establishmentId: number) {
      this.id = id;
      this.brand = brand;
      this.model = model;
      this.color = color;
      this.plate = plate;
      this.type = type;
      this.establishmentId = establishmentId;
      this.establishment = null;
    }

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    brand!: string;

    @Column()
    model!: string;

    @Column()
    color!: string;

    @Column()
    plate!: string;

    @Column()
    type!: string;

    @Column()
    establishmentId!: number;

    @ManyToOne(() => Establishment, (establishment: Establishment) => establishment.vehicles, {
      onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'establishmentId' })
    establishment!: Establishment | null;
}
