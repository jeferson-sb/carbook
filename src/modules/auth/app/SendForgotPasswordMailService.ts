import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { ApplicationService } from '@lib/ApplicationService';
import { UserRepository } from '@modules/user/domain/UserRepository';
import { UserTokensRepository } from '@modules/user/domain/UserTokensRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';
import { DateProvider } from '@lib/DateProvider';
import { MailProvider } from '@lib/MailProvider';

type Dependencies = {
  userRepository: UserRepository;
  userTokensRepository: UserTokensRepository;
  dateProvider: DateProvider;
  mailProvider: MailProvider;
};

export class SendForgotPasswordMailService
  implements ApplicationService<unknown, unknown>
{
  private userRepository: UserRepository;

  private userTokensRepository: UserTokensRepository;

  private dateProvider: DateProvider;

  private mailProvider: MailProvider;

  constructor({
    userRepository,
    userTokensRepository,
    dateProvider,
    mailProvider,
  }: Dependencies) {
    this.userRepository = userRepository;
    this.userTokensRepository = userTokensRepository;
    this.dateProvider = dateProvider;
    this.mailProvider = mailProvider;
  }

  async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);
    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'presentation',
      'api',
      'views',
      'forgotPassword.hbs',
    );

    if (!user) throw new HTTPError('User does not exist');

    const refreshToken = uuidv4();

    const expiresDate = this.dateProvider.addHours(3);

    await this.userTokensRepository.store({
      id: this.userTokensRepository.getNextId(),
      refreshToken,
      userId: user.id,
      expiresDate,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}`,
    };

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Password recovery',
      variables,
      path: templatePath,
    });
  }
}
