import { v4 as uuidv4 } from 'uuid';

import { Category } from '../../../domain/Category';
import { CategoryRepository } from '../../../domain/CategoryRepository';

export class MemCategoryRepository implements CategoryRepository<Category> {
  private categories: Category[] = [];

  private static instance: MemCategoryRepository;

  static getInstance(): CategoryRepository<Category> {
    if (!MemCategoryRepository.instance) {
      MemCategoryRepository.instance = new MemCategoryRepository();
    }
    return MemCategoryRepository.instance;
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(category: Category): void {
    this.categories.push(category);
  }

  async findAll(): Category[] {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}
