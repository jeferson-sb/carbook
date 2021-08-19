import { Request, Response } from 'express';

import { container } from '@modules/rental/container';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

const listRentalByUserController = async (
  request: UserRequest,
  response: Response,
): Promise<Response> => {
  try {
    const { id } = request.user;
    const { listRentalByUserService } = container.cradle;

    const rentals = await listRentalByUserService.execute(id);

    return response.status(200).json(rentals);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

export { listRentalByUserController };
