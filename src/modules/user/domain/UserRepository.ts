import { User } from './User';

export interface UserRepository {
  getNextId(): string;
  store(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
