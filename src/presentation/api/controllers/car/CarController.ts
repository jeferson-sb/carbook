import { Request, Response } from 'express';

import { container } from '@modules/car/container';

interface ListQueryRequest extends Request {
  query: {
    name: string;
    brand: string;
    category_id: string;
  };
}

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

  async listAvailable(
    request: ListQueryRequest,
    response: Response,
  ): Promise<Response> {
    try {
      const { brand, name, category_id } = request.query;

      const { listCarService } = container.cradle;

      const cars = await listCarService.execute({
        brand,
        name,
        category_id,
      });

      return response.status(200).json(cars);
    } catch (error) {
      return response.sendStatus(500);
    }
  }
}

export default CarController;
