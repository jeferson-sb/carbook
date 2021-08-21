export type MailOptions = {
  to: string;
  subject: string;
  variables: unknown;
  path: string;
};

export interface MailProvider {
  sendMail({ to, subject, variables, path }: MailOptions): Promise<void>;
}
