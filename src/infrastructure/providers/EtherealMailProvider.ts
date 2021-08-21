import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';

import { MailOptions, MailProvider } from '@lib/MailProvider';
import Handlebars from 'handlebars';

export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });

        this.client = transporter;
      })
      .catch(err => console.error(err));
  }

  async sendMail({ to, subject, variables, path }: MailOptions): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = Handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: `Carbook <noreply@carbook.com>`,
      subject,
      html: templateHTML,
    });

    console.log('Message sent: ', message.messageId);
    console.log('Preview url: ', nodemailer.getTestMessageUrl(message));
  }
}
