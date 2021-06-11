import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { ApplicationService } from '../../lib/ApplicationService';

interface CategoryDTO {
  name: string;
  description: string;
}

export class CreateCategoryService
  implements ApplicationService<CategoryDTO, void>
{
  constructor(private categoryRepository: CategoryRepository) {}

  execute({ name, description }: CategoryDTO): void {
    const existingCategory = this.categoryRepository.findByName(name);
    if (existingCategory) {
      throw new Error('This category already exists.');
    }

    const category = Category.from({
      id: this.categoryRepository.getNextId(),
      name,
      description,
    });

    this.categoryRepository.store(category);
  }
}
