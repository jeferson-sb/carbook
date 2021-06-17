import { hash } from 'bcrypt';

import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';
import { ApplicationService } from '../../lib/ApplicationService';

type Dependencies = {
  userRepository: UserRepository;
};

interface CreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_license: string;
}

export class CreateUserService
  implements ApplicationService<CreateUserDTO, void>
{
  private userRepository: UserRepository;

  constructor({ userRepository }: Dependencies) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    email,
    password,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('User already exists.');
    }

    const passwordHash = await hash(password, 8);

    const user = new User({
      id: this.userRepository.getNextId(),
      name,
      email,
      password: passwordHash,
      driver_license,
    });
    await this.userRepository.store(user);
  }
}
