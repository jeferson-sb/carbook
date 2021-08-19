import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { ApplicationService } from '@lib/ApplicationService';
import { CONSTANTS } from '@config/auth';
import { DateProvider } from '@lib/DateProvider';
import { HTTPError } from '@presentation/api/errors/HTTPError';

import { UserRepository } from '../../user/domain/UserRepository';
import { UserTokensRepository } from '../../user/domain/UserTokensRepository';

type Dependencies = {
  userRepository: UserRepository;
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
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
  refresh_token: string;
}

export class AuthenticateUserService
  implements ApplicationService<AuthenticateUserDTO, Response>
{
  private userRepository: UserRepository;

  private usersTokensRepository: UserTokensRepository;

  private dateProvider: DateProvider;

  constructor({
    userRepository,
    userTokensRepository: usersTokensRepository,
    dateProvider,
  }: Dependencies) {
    this.userRepository = userRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
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

    const {
      EXPIRES_IN_TOKEN,
      EXPIRES_REFRESH_TOKEN_DAYS,
      EXPIRES_IN_REFRESH_TOKEN,
      SECRET_TOKEN,
      SECRET_REFRESH_TOKEN,
    } = CONSTANTS;

    const token = sign({}, SECRET_TOKEN, {
      subject: existingUser.id,
      expiresIn: EXPIRES_IN_TOKEN,
    });

    const refreshToken = sign({ email }, SECRET_REFRESH_TOKEN, {
      subject: existingUser.id,
      expiresIn: EXPIRES_IN_REFRESH_TOKEN,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      EXPIRES_REFRESH_TOKEN_DAYS,
    );

    await this.usersTokensRepository.store({
      id: this.usersTokensRepository.getNextId(),
      userId: existingUser.id,
      expiresDate: refresh_token_expires_date,
      refreshToken,
    });

    const tokenReturn: Response = {
      token,
      user: {
        name: existingUser.name,
        email: existingUser.email,
      },
      refresh_token: refreshToken,
    };

    return tokenReturn;
  }
}
