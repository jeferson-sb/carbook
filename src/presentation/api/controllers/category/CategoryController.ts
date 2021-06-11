import { Request, Response } from 'express';

import { CreateCategoryService } from '../../../../application/category/CreateCategoryService';
import { ImportCategoryService } from '../../../../application/category/ImportCategoryService';
import { ListCategoryService } from '../../../../application/category/ListCategoryService';
import { MemCategoryRepository } from '../../../../infra/category/MemCategoryRepository';

class CategoryController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      // TODO: Validate data
      const { name, description } = request.body;

      const categoryRepository = MemCategoryRepository.getInstance();
      const categoryService = new CreateCategoryService(categoryRepository);

      categoryService.execute({ name, description });

      return response.status(201).json({ status: 201 });
    } catch (error) {
      return response.status(400).json({ status: 400, error: error.message });
    }
  }

  findAll(request: Request, response: Response): Response {
    const categoryRepository = MemCategoryRepository.getInstance();
    const listCategoryService = new ListCategoryService(categoryRepository);

    const categories = listCategoryService.execute();

    return response.status(200).json({ status: 200, categories });
  }

  import(request: Request, response: Response): Response {
    const { file } = request;
    const importCategoryService = new ImportCategoryService(
      MemCategoryRepository.getInstance(),
    );

    importCategoryService.execute(file);

    return response.sendStatus(200);
  }
}

export default CategoryController;
