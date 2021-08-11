import { Request, Response, NextFunction } from 'express';

import { SQLUserRepository } from '../../../infra/user/repositories/SQLUserRepository';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

export async function ensureAdmin(
  request: UserRequest,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = request.user;
  const userRepository = new SQLUserRepository();
  const user = await userRepository.findById(id);

  if (!user.is_admin) {
    throw new Error('User is not admin!');
  }

  return next();
}
