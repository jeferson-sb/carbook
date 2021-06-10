import { Category } from './Category';

export interface CategoryRepository {
  getNextId(): string;
  store(category: Category): void;
  findAll(): Category[];
  findByName(name: string): Category;
}
