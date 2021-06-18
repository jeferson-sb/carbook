import { Category } from '../../domain/Category';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { ApplicationService } from '../../lib/ApplicationService';
import { CategoryDTO } from './payload/CategoryDTO';

type Dependencies = {
  categoryRepository: CategoryRepository;
};

export class CreateCategoryService
  implements ApplicationService<CategoryDTO, void>
{
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }: Dependencies) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ name, description }: CategoryDTO): Promise<void> {
    const existingCategory = await this.categoryRepository.findByName(name);

    if (existingCategory) {
      throw new Error('This category already exists.');
    }

    const category = Category.from({
      id: this.categoryRepository.getNextId(),
      name,
      description,
    });

    await this.categoryRepository.store(category);
  }
}
