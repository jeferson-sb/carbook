import { ApplicationService } from '@lib/ApplicationService';

import { Category } from '../domain/Category';
import { CategoryRepository } from '../domain/CategoryRepository';

type Dependencies = {
  categoryRepository: CategoryRepository;
};

export class ListCategoryService
  implements ApplicationService<undefined, Category[]>
{
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }: Dependencies) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }
}
