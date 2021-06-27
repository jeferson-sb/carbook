import { Request, Response } from 'express';

import container from '../../container';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id: car_id } = request.params;
      const { specifications_id } = request.body;

      const { createCarSpecificationService } = container.cradle;

      await createCarSpecificationService.execute({
        car_id,
        specifications_id,
      });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(500);
    }
  }
}

export default CreateCarSpecificationController;
