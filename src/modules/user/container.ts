import { LocalStorageProvider } from '@infrastructure/providers/LocalStorageProvider';
import { StorageProvider } from '@lib/StorageProvider';
import { asClass, createContainer } from 'awilix';

import { CreateUserService } from './app/CreateUserService';
import { ShowUserProfileService } from './app/ShowUserProfileService';
import { UpdateUserAvatarService } from './app/UpdateUserAvatarService';
import { UserRepository } from './domain/UserRepository';
import { UserTokensRepository } from './domain/UserTokensRepository';
import { SQLUserRepository } from './infra/repositories/SQLUserRepository';
import { SQLUserTokensRepository } from './infra/repositories/SQLUserTokensRepository';

export type Container = {
  userRepository: UserRepository;
  userTokensRepository: UserTokensRepository;
  createUserService: CreateUserService;
  updateUserAvatarService: UpdateUserAvatarService;
  showUserProfileService: ShowUserProfileService;
  storageProvider: StorageProvider;
};

const container = createContainer<Container>();

container.register({
  userRepository: asClass(SQLUserRepository).singleton(),
  userTokensRepository: asClass(SQLUserTokensRepository).singleton(),
  createUserService: asClass(CreateUserService).singleton(),
  updateUserAvatarService: asClass(UpdateUserAvatarService).singleton(),
  showUserProfileService: asClass(ShowUserProfileService).singleton(),
  storageProvider: asClass(LocalStorageProvider).singleton(),
});

export { container };
