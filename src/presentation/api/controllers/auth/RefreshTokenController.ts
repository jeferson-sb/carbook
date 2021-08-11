import { Request, Response } from 'express';

import container from '../../container';

const refreshTokenController = async (
  request: Request,
  response: Response,
): Promise<Response> => {
  try {
    const token =
      request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token;

    const { refreshTokenService } = container.cradle;

    const refreshToken = await refreshTokenService.execute(token);

    return response.status(200).json(refreshToken);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
};

export { refreshTokenController };
