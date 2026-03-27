import { env } from "@/config/env";
import { ConsoleEmailProvider } from "@/email/providers/console-provider";
import { ResendEmailProvider } from "@/email/providers/resend-provider";
import { SmtpEmailProvider } from "@/email/providers/smtp-provider";
import type { EmailProvider } from "@/email/providers/types";

export function createEmailProvider(): EmailProvider {
  switch (env.EMAIL_PROVIDER) {
    case "smtp":
      return new SmtpEmailProvider();
    case "resend":
      return new ResendEmailProvider();
    case "console":
    default:
      return new ConsoleEmailProvider();
  }
}
