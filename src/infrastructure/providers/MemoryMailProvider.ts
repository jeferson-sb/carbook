import { MailOptions, MailProvider } from '@lib/MailProvider';

export class MemoryMailProvider implements MailProvider {
  private messages: MailOptions[] = [];

  async sendMail({ to, subject, variables, path }: MailOptions): Promise<void> {
    this.messages.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
