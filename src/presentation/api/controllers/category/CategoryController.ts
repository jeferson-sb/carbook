import { Request, Response } from 'express';

import { CreateCategoryService } from '../../../../application/category/CreateCategoryService';
import { MemCategoryRepository } from '../../../../infra/category/MemCategoryRepository';

const categoryRepository = new MemCategoryRepository();

class CategoryController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      // TODO: Validate data
      const { name, description } = request.body;

      const categoryService = new CreateCategoryService(categoryRepository);

      categoryService.execute({ name, description });

      return response.status(201).json({ status: 201 });
    } catch (error) {
      return response.status(400).json({ status: 400, error: error.message });
    }
  }

  findAll(request: Request, response: Response): Response {
    const categories = categoryRepository.findAll();

    return response.status(200).json({ status: 200, categories });
  }
}

export default CategoryController;
