import { Repository, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserEntity } from '../typeorm/UserEntity';
import { UserRepository } from '../../../domain/user/UserRepository';

interface CreateUserDTO {
  id: string;
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

export class SQLUserRepository implements UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(userData: CreateUserDTO): Promise<void> {
    const user = await this.repository.create(userData);
    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}
