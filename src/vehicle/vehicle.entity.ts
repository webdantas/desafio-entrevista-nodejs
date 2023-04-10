import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from '../establishment/establishment.entity';

@Entity()
export class Vehicle {
    constructor(id: number, plate: string, type: string, establishmentId: number) {
      this.id = id;
      this.plate = plate;
      this.type = type;
      this.establishmentId = establishmentId;
      this.establishment = null;
    }

    @PrimaryGeneratedColumn()
    id!: number;

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


export default Vehicle;
