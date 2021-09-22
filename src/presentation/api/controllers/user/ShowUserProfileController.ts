import { container } from '@modules/user/container';
import { Request, Response } from 'express';

const showUserProfileController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { id } = request.user;
    const { showUserProfileService } = container.cradle;

    const user = await showUserProfileService.execute(id);

    return response.status(200).json(user);
  } catch (error) {
    return response.status(404).json({ error: error.message });
  }
};

export { showUserProfileController };
