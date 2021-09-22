import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';

import { MailOptions, MailProvider } from '@lib/MailProvider';
import Handlebars from 'handlebars';
import { SES } from 'aws-sdk';

export class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail({ to, subject, variables, path }: MailOptions): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = Handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: `Carbook <noreply@carbook.com>`,
      subject,
      html: templateHTML,
    });
  }
}
