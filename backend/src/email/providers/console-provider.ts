import crypto from "node:crypto";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "@/email/providers/types";
import { logger } from "@/lib/logger";

export class ConsoleEmailProvider implements EmailProvider {
  readonly name = "console";

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    logger.info("Sending email with console provider", {
      to: input.to,
      subject: input.subject
    });
    logger.info("Email payload preview", {
      html: input.html,
      text: input.text
    });

    return {
      provider: this.name,
      messageId: crypto.randomUUID()
    };
  }
}
