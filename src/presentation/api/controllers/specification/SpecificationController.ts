import { Request, Response } from 'express';

import { CreateSpecificationService } from '../../../../application/specification/CreateSpecificationService';
import { MemSpecificationRepository } from '../../../../infra/specification/MemSpecificationRepository';

class SpecificationController {
  store(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      const specificationRepository = new MemSpecificationRepository();
      const createSpecificationService = new CreateSpecificationService(
        specificationRepository,
      );

      createSpecificationService.execute({ name, description });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(400);
    }
  }
}

export default SpecificationController;
