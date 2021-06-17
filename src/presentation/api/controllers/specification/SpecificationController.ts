import { Request, Response } from 'express';

import container from '../../container';

class SpecificationController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const { createSpecificationService } = container.cradle;

      await createSpecificationService.execute({ name, description });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(400);
    }
  }
}

export default SpecificationController;
