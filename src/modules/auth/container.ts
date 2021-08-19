import { asClass, createContainer } from 'awilix';

import { AuthenticateUserService } from './app/AuthenticateUserService';
import { RefreshTokenService } from './app/RefreshTokenService';

export type Container = {
  authenticateUserService: AuthenticateUserService;
  refreshTokenService: RefreshTokenService;
};

const container = createContainer<Container>();

container.register({
  authenticateUserService: asClass(AuthenticateUserService),
  refreshTokenService: asClass(RefreshTokenService),
});

export { container };
