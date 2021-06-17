import { Request, Response } from 'express';

import container from '../../container';

class CategoryController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      // TODO: Validate data
      const { name, description } = request.body;

      const { createCategoryService } = container.cradle;

      await createCategoryService.execute({ name, description });

      return response.status(201).json({ status: 201 });
    } catch (error) {
      return response.status(400).json({ status: 400, error: error.message });
    }
  }

  async findAll(request: Request, response: Response): Promise<Response> {
    const { listCategoryService } = container.cradle;

    const categories = await listCategoryService.execute();

    return response.status(200).json({ status: 200, categories });
  }

  async import(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;
      const { importCategoryService } = container.cradle;

      await importCategoryService.execute(file);

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(500);
    }
  }
}

export default CategoryController;
