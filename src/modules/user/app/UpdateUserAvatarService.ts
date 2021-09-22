import { ApplicationService } from '@lib/ApplicationService';

import { StorageProvider } from '@lib/StorageProvider';
import { UserRepository } from '../domain/UserRepository';

interface Request {
  user_id: string;
  avatar_file: string;
}

type Dependencies = {
  userRepository: UserRepository;
  storageProvider: StorageProvider;
};

export class UpdateUserAvatarService
  implements ApplicationService<Request, void>
{
  private userRepository: UserRepository;

  private storageProvider: StorageProvider;

  constructor({ userRepository, storageProvider }: Dependencies) {
    this.userRepository = userRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ user_id, avatar_file }: Request): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    user.avatar = avatar_file;

    await this.userRepository.store(user);
  }
}
