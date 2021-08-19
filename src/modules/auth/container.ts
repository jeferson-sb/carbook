import { asClass, createContainer } from 'awilix';

import { UserRepository } from '@modules/user/domain/UserRepository';
import { SQLUserRepository } from '@modules/user/infra/repositories/SQLUserRepository';
import { SQLUserTokensRepository } from '@modules/user/infra/repositories/SQLUserTokensRepository';

import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { DateProvider } from '@lib/DateProvider';
import { AuthenticateUserService } from './app/AuthenticateUserService';
import { RefreshTokenService } from './app/RefreshTokenService';

export type Container = {
  authenticateUserService: AuthenticateUserService;
  refreshTokenService: RefreshTokenService;
  userRepository: UserRepository;
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
};

const container = createContainer<Container>();

container.register({
  userRepository: asClass(SQLUserRepository).singleton(),
  userTokensRepository: asClass(SQLUserTokensRepository).singleton(),
  authenticateUserService: asClass(AuthenticateUserService).singleton(),
  refreshTokenService: asClass(RefreshTokenService).singleton(),
  dateProvider: asClass(DayjsDateProvider).singleton(),
});

export { container };
