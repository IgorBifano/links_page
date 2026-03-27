export type SendEmailInput = {
  to: string;
  from: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult = {
  provider: string;
  messageId: string | null;
};

export interface EmailProvider {
  readonly name: string;
  send(input: SendEmailInput): Promise<SendEmailResult>;
}
