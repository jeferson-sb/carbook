import { HTTPError } from '@presentation/api/errors/HTTPError';
import { CreateCategoryService } from '@modules/category/app/CreateCategoryService';
import { MemCategoryRepository } from '@modules/category/infra/repositories/MemCategoryRepository';

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

  describe('when there is existing category with the same name', () => {
    it('should not be able to create a new category', async () => {
      expect(async () => {
        const category = {
          name: 'Category Test',
          description: 'Category description here',
        };

        await createCategoryService.execute(category);
        await createCategoryService.execute(category);
      }).rejects.toBeInstanceOf(HTTPError);
    });
  });
});
