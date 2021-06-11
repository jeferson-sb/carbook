import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { ApplicationService } from '../../lib/ApplicationService';

export class ListCategoryService
  implements ApplicationService<any, Category[]>
{
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Category[] {
    const categories = this.categoryRepository.findAll();
    return categories;
  }
}
