import { Request, Response } from 'express';

import container from '../../container';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

class CreateRentalController {
  async handle(request: UserRequest, response: Response): Promise<Response> {
    try {
      const { expected_return_date, car_id } = request.body;
      const { id: user_id } = request.user;

      const { createRentalService } = container.cradle;

      const rental = await createRentalService.execute({
        carId: car_id,
        expectedReturnDate: expected_return_date,
        userId: user_id,
      });

      return response.status(201).json(rental);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default CreateRentalController;
