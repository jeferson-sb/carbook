import { ApplicationService } from '../../lib/ApplicationService';
import { UserRepository } from '../../domain/user/UserRepository';
import { deleteFile } from '../../infra/config/file';

interface Request {
  user_id: string;
  avatar_file: string;
}

type Dependencies = {
  userRepository: UserRepository;
};

export class UpdateUserAvatarService
  implements ApplicationService<Request, void>
{
  private userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute({ user_id, avatar_file }: Request): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.userRepository.store(user);
  }
}
