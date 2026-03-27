import nodemailer from "nodemailer";
import { env } from "@/config/env";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "@/email/providers/types";

export class SmtpEmailProvider implements EmailProvider {
  readonly name = "smtp";

  private readonly transport = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_SECURE,
    auth:
      env.SMTP_USER && env.SMTP_PASS
        ? {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS
          }
        : undefined
  });

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    const result = await this.transport.sendMail(input);

    return {
      provider: this.name,
      messageId: result.messageId
    };
  }
}
