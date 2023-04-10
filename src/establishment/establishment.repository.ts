import { EntityRepository, Repository } from 'typeorm';
import { Establishment } from './establishment.entity';

@EntityRepository(Establishment)
export class EstablishmentRepository extends Repository<Establishment> {}
