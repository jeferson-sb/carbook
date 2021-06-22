import { Request, Response } from 'express';

import container from '../../container';

class CarController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      } = request.body;

      const { createCarService } = container.cradle;

      const { id } = await createCarService.execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
      });

      return response.status(201).json({ id });
    } catch (error) {
      return response.sendStatus(500);
    }
  }
}

export default CarController;
