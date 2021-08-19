import { Request, Response } from 'express';

import { container } from '@modules/user/container';

interface UserRequest extends Request {
  user: {
    id: string;
  };
  file: unknown;
}

class UserController {
  async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, driver_license } = request.body;

      const { createUserService } = container.cradle;

      await createUserService.execute({
        name,
        email,
        password,
        driver_license,
      });

      return response.sendStatus(201);
    } catch (error) {
      return response.sendStatus(500);
    }
  }

  async updateAvatar(
    request: UserRequest,
    response: Response,
  ): Promise<Response> {
    try {
      const { id } = request.user;
      const avatar_file = request.file.filename;

      const { updateUserAvatarService } = container.cradle;

      await updateUserAvatarService.execute({ user_id: id, avatar_file });

      return response.sendStatus(204);
    } catch (error) {
      return response.sendStatus(400);
    }
  }
}

export default UserController;
