import { Request, Response } from 'express';

import { container } from '@modules/auth/container';

class AuthenticateUserController {
  async authenticate(request: Request, response: Response): Promise<Response> {
    try {
      const { password, email } = request.body;

      const { authenticateUserService } = container.cradle;

      const token = await authenticateUserService.execute({
        email,
        password,
      });

      return response.status(200).json(token);
    } catch (error) {
      return response.status(401).json({ error: error.message });
    }
  }
}

export default AuthenticateUserController;
