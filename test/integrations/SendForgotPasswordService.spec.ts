import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { MemoryMailProvider } from '@infrastructure/providers/MemoryMailProvider';
import { DateProvider } from '@lib/DateProvider';
import { MailProvider } from '@lib/MailProvider';
import { SendForgotPasswordMailService } from '@modules/auth/app/SendForgotPasswordMailService';
import { User } from '@modules/user/domain/User';
import { UserRepository } from '@modules/user/domain/UserRepository';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { MemUserRepository } from '@modules/user/infra/repositories/MemUserRepository';
import { MemUserTokensRepository } from '@modules/user/infra/repositories/MemUserTokensRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';

let userRepository: UserRepository;
let dateProvider: DateProvider;
let userTokensRepository: UserTokensRepository;
let mailProvider: MailProvider;
let sendForgotPasswordMailService: SendForgotPasswordMailService;

describe('Send Forgot Password Mail', () => {
  beforeEach(() => {
    userRepository = new MemUserRepository();
    dateProvider = new DayjsDateProvider();
    userTokensRepository = new MemUserTokensRepository();
    mailProvider = new MemoryMailProvider();

    sendForgotPasswordMailService = new SendForgotPasswordMailService({
      userRepository,
      dateProvider,
      userTokensRepository,
      mailProvider,
    });
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await userRepository.store(
      new User({
        id: userRepository.getNextId(),
        name: 'Eric Evans',
        email: 'eric@carbook.com',
        password: '123456',
        driver_license: 'BRA1774',
      }),
    );

    await sendForgotPasswordMailService.execute('eric@carbook.com');

    expect(sendMail).toHaveBeenCalled();
  });

  describe('when user does not exists', () => {
    it('should not be able to send mail', async () => {
      await expect(
        sendForgotPasswordMailService.execute('kain@carbook.com'),
      ).rejects.toBeInstanceOf(HTTPError);
    });
  });

  it("should be able to create an user's token", async () => {
    const createToken = jest.spyOn(userTokensRepository, 'store');

    await userRepository.store(
      new User({
        id: userRepository.getNextId(),
        name: 'Josh',
        email: 'josh@carbook.com',
        password: '123456',
        driver_license: 'USA1774',
      }),
    );

    await sendForgotPasswordMailService.execute('josh@carbook.com');

    expect(createToken).toHaveBeenCalled();
  });
});
