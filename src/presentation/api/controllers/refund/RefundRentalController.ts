import { Request, Response } from 'express';

import container from '../../container';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

const refundRentalController = async (
  request: UserRequest,
  response: Response,
): Promise<Response> => {
  try {
    const { id: userId } = request.user;
    const { id: rentalId } = request.params;

    const { refundRentalService } = container.cradle;

    const rental = await refundRentalService.execute({
      rentalId,
      userId,
    });

    return response.status(200).json(rental);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

export { refundRentalController };
