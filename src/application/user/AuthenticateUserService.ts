import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ApplicationService } from '../../lib/ApplicationService';
import { HTTPError } from '../../infra/http/HTTPError';
import { UserRepository } from '../../domain/UserRepository';

type Dependencies = {
  userRepository: UserRepository;
};

interface AuthenticateUserDTO {
  email: string;
  password: string;
}

interface Response {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export class AuthenticateUserService
  implements ApplicationService<AuthenticateUserDTO, Response>
{
  private userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: AuthenticateUserDTO): Promise<Response> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new HTTPError('Email or password incorrect', 401);
    }

    const passwordMatch = await compare(password, existingUser.password);

    if (!passwordMatch) {
      throw new HTTPError('Email or password incorrect', 401);
    }

    const token = sign({}, process.env.AUTH_SECRET, {
      subject: existingUser.id,
      expiresIn: '1d',
    });

    const tokenReturn: Response = {
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
    };

    return tokenReturn;
  }
}
