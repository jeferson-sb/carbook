import { ApplicationService } from '@lib/ApplicationService';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

type Dependencies = {
  userRepository: UserRepository;
};

export class ShowUserProfileService
  implements ApplicationService<string, User | null>
{
  private userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
