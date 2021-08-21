import { ApplicationService } from '@lib/ApplicationService';
import { DateProvider } from '@lib/DateProvider';
import { User } from '@modules/user/domain/User';
import { UserRepository } from '@modules/user/domain/UserRepository';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';

import { hash } from 'bcrypt';

interface Request {
  token: string;
  password: string;
}

type Dependencies = {
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
  userRepository: UserRepository;
};

export class ResetPasswordUserService
  implements ApplicationService<Request, void>
{
  private userTokensRepository: UserTokensRepository;

  private userRepository: UserRepository;

  private dateProvider: DateProvider;

  constructor({
    userTokensRepository,
    dateProvider,
    userRepository,
  }: Dependencies) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.userRepository = userRepository;
  }

  async execute({ token, password }: Request): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) throw new HTTPError('Invalid token');

    const isExpiredToken = this.dateProvider.compareIfBefore(
      userToken.expiresDate,
      this.dateProvider.dateNow(),
    );

    if (isExpiredToken) throw new HTTPError('Token expired');

    const user = await this.userRepository.findById(userToken.userId);

    if (!user) throw new HTTPError('User is not found');

    await this.userRepository.store(
      new User({
        id: user.id,
        name: user.name,
        email: user.email,
        password: await hash(password, 8),
        driver_license: user.driver_license,
      }),
    );

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
