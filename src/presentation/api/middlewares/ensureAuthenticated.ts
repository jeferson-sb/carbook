import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { CONSTANTS } from '@config/auth';
import { SQLUserTokensRepository } from '@modules/user/infra/repositories/SQLUserTokensRepository';
import { HTTPError } from '../errors/HTTPError';

interface JWTPayload {
  sub: string;
}

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

export async function ensureAuthenticated(
  request: UserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new HTTPError('Token missing', 401);

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(token, CONSTANTS.SECRET_TOKEN) as JWTPayload;

    const userTokensRepository = new SQLUserTokensRepository();
    const user = await userTokensRepository.findByUserIdAndToken(userId, token);

    if (!user) throw new HTTPError('User does not exists', 400);

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    throw new HTTPError('Invalid token', 401);
  }
}
