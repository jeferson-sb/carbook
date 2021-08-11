import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../domain/user/User';
import { UserRepository } from '../../../domain/user/UserRepository';

export class MemUserRepository implements UserRepository {
  private users: User[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((u) => u.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((u) => u.id === id);
  }
}
