import { sign, verify } from 'jsonwebtoken';

import { ApplicationService } from '../../lib/ApplicationService';
import { UserTokensRepository } from '../../domain/user/UserTokensRepository';
import { DateProvider } from '../../domain/DateProvider';

import { CONSTANTS } from '../../infra/config/auth';

type Dependencies = {
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
};

type Payload = {
  sub: string;
  email: string;
};

export class RefreshTokenService
  implements ApplicationService<unknown, string>
{
  private userTokensRepository: UserTokensRepository;

  private dateProvider: DateProvider;

  constructor({ userTokensRepository, dateProvider }: Dependencies) {
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(
      token,
      CONSTANTS.SECRET_REFRESH_TOKEN,
    ) as Payload;
    const userId = sub;

    const userToken = await this.userTokensRepository.findByUserIdAndToken(
      userId,
      token,
    );

    if (!userToken) throw new Error('Refresh token error!');

    await this.userTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, CONSTANTS.SECRET_REFRESH_TOKEN, {
      subject: sub,
      expiresIn: CONSTANTS.EXPIRES_IN_REFRESH_TOKEN,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      CONSTANTS.EXPIRES_REFRESH_TOKEN_DAYS,
    );

    await this.userTokensRepository.store({
      id: this.userTokensRepository.getNextId(),
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId,
    });

    return refreshToken;
  }
}
