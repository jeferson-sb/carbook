import { v4 as uuidv4 } from 'uuid';

import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';

export class MemCategoryRepository implements CategoryRepository {
  private categories: Category[] = [];

  private static instance: MemCategoryRepository;

  static getInstance(): CategoryRepository {
    if (!MemCategoryRepository.instance) {
      MemCategoryRepository.instance = new MemCategoryRepository();
    }
    return MemCategoryRepository.instance;
  }

  getNextId(): string {
    return uuidv4();
  }

  store(category: Category): void {
    this.categories.push(category);
  }

  findAll(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
}
