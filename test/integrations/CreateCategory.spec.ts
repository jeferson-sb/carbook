import { CreateCategoryService } from '../../src/application/category/CreateCategoryService';
import { MemCategoryRepository } from '../../src/infra/category/repositories/MemCategoryRepository';

let createCategoryService: CreateCategoryService;
let categoryRepository: MemCategoryRepository;

describe('Create category', () => {
  beforeEach(() => {
    categoryRepository = new MemCategoryRepository();
    createCategoryService = new CreateCategoryService({ categoryRepository });
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description here',
    };

    await createCategoryService.execute(category);

    const categoryCreated = await categoryRepository.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with the same name', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description here',
      };

      await createCategoryService.execute(category);
      await createCategoryService.execute(category);
    }).rejects.toBeInstanceOf(Error);
  });
});
