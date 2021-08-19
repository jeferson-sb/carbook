import { v4 as uuidv4 } from 'uuid';

import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';

export class MemCategoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store(category: Category): Promise<void> {
    this.categories.push(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(categoryName: string): Promise<Category | null> {
    const category = this.categories.find(catg => catg.name === categoryName);

    if (!category) return null;

    return Category.from(category);
  }

  async findById(categoryId: string): Promise<Category | null> {
    const category = this.categories.find(catg => catg.id === categoryId);

    if (!category) return null;

    return Category.from(category);
  }
}
