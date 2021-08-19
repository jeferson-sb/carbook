import { Repository, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CategoryRepository } from '../../domain/CategoryRepository';
import { CategoryEntity } from '../typeorm/CategoryEntity';
import { Category } from '../../domain/Category';

export class SQLCategoryRepository implements CategoryRepository {
  private repository: Repository<CategoryEntity>;

  constructor() {
    this.repository = getRepository(CategoryEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(categoryData: Category): Promise<void> {
    const category = this.repository.create(categoryData);
    await this.repository.save(category);
  }

  async findAll(): Promise<CategoryEntity[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const category = await this.repository.findOne({ name });
    return category;
  }

  async findById(id: string): Promise<CategoryEntity> {
    const category = await this.repository.findOne(id);
    return category;
  }
}
