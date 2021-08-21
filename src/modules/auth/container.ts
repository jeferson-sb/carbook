import { asClass, asValue, createContainer } from 'awilix';

import { UserRepository } from '@modules/user/domain/UserRepository';
import { SQLUserRepository } from '@modules/user/infra/repositories/SQLUserRepository';
import { SQLUserTokensRepository } from '@modules/user/infra/repositories/SQLUserTokensRepository';

import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { DateProvider } from '@lib/DateProvider';
import { MailProvider } from '@lib/MailProvider';
import { EtherealMailProvider } from '@infrastructure/providers/EtherealMailProvider';
import { AuthenticateUserService } from './app/AuthenticateUserService';
import { RefreshTokenService } from './app/RefreshTokenService';
import { SendForgotPasswordMailService } from './app/SendForgotPasswordMailService';
import { ResetPasswordUserService } from './app/ResetPasswordUserService';

export type Container = {
  authenticateUserService: AuthenticateUserService;
  refreshTokenService: RefreshTokenService;
  sendForgotPasswordMailService: SendForgotPasswordMailService;
  resetPasswordUserService: ResetPasswordUserService;
  userRepository: UserRepository;
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
  mailProvider: MailProvider;
};

const container = createContainer<Container>();

container.register({
  userRepository: asClass(SQLUserRepository).singleton(),
  userTokensRepository: asClass(SQLUserTokensRepository).singleton(),
  authenticateUserService: asClass(AuthenticateUserService).singleton(),
  refreshTokenService: asClass(RefreshTokenService).singleton(),
  resetPasswordUserService: asClass(ResetPasswordUserService).singleton(),
  sendForgotPasswordMailService: asClass(
    SendForgotPasswordMailService,
  ).singleton(),
  dateProvider: asClass(DayjsDateProvider).singleton(),
  mailProvider: asValue(new EtherealMailProvider()),
});

export { container };
