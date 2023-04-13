import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }
}
