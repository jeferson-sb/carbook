import { AuthenticateUserService } from '@modules/auth/app/AuthenticateUserService';
import { CreateUserService } from '@modules/user/app/CreateUserService';
import { MemUserRepository } from '@modules/user/infra/repositories/MemUserRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';
import { DateProvider } from '@lib/DateProvider';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { MemUserTokensRepository } from '@modules/user/infra/repositories/MemUserTokensRepository';

let authenticateUserService: AuthenticateUserService;
let userRepository: MemUserRepository;
let createUserService: CreateUserService;
let dateProvider: DateProvider;
let userTokensRepository: UserTokensRepository;

describe('Authenticate User', () => {
  beforeEach(() => {
    userRepository = new MemUserRepository();
    userTokensRepository = new MemUserTokensRepository();
    dateProvider = new DayjsDateProvider();
    createUserService = new CreateUserService({ userRepository });
    authenticateUserService = new AuthenticateUserService({
      userRepository,
      userTokensRepository,
      dateProvider,
    });
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@carbook.com',
      password: '123@abc',
      driver_license: '000123',
    };

    await createUserService.execute(user);
    const result = await authenticateUserService.execute(user);

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: 'jeferson@carbook.com',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(HTTPError);
  });

  it('should be able to authenticate with invalid credentials', () => {
    expect(async () => {
      const user = {
        name: 'George Young',
        email: 'george@carbook.com',
        password: '123@abc',
        driver_license: '000457',
      };

      await createUserService.execute(user);
      await authenticateUserService.execute({
        email: user.email,
        password: '2@c4t12',
      });
    }).rejects.toBeInstanceOf(HTTPError);
  });
});
