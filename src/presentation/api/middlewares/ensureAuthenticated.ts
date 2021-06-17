import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { HTTPError } from '../../../infra/http/HTTPError';
import { SQLUserRepository } from '../../../infra/user/repositories/SQLUserRepository';

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

  if (!authHeader) {
    throw new HTTPError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      process.env.AUTH_SECRET,
    ) as JWTPayload;

    const usersRepository = new SQLUserRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new HTTPError('User does not exists', 400);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new HTTPError('Invalid token', 401);
  }
}
