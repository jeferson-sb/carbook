import { User } from './User';

export interface UserRepository {
  getNextId(): string;
  store(user: User): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
