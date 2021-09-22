import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { CONSTANTS } from '@config/auth';
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

    request.user = {
      id: userId,
    };

    next();
  } catch (error) {
    console.log(error.message);
    throw new HTTPError('Invalid token', 401);
  }
}
