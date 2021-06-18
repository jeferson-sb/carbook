import { Category } from './Category';

export interface CategoryRepository {
  getNextId(): string;
  store(category: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}
