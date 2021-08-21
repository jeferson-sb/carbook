import { container } from '@modules/auth/container';
import { Request, Response } from 'express';

const resetPasswordUserController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const { token } = request.query;
    const { password } = request.body;

    const { resetPasswordUserService } = container.cradle;

    await resetPasswordUserService.execute({ token: String(token), password });

    return response.sendStatus(204);
  } catch (error) {
    return response.status(400).json({ error });
  }
};

export { resetPasswordUserController };
