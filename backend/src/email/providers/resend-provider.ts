import { env } from "@/config/env";
import type { EmailProvider, SendEmailInput, SendEmailResult } from "@/email/providers/types";

export class ResendEmailProvider implements EmailProvider {
  readonly name = "resend";

  async send(input: SendEmailInput): Promise<SendEmailResult> {
    if (!env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is required when EMAIL_PROVIDER=resend");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: input.from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text
      })
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Resend request failed: ${body}`);
    }

    const payload = (await response.json()) as { id?: string };

    return {
      provider: this.name,
      messageId: payload.id ?? null
    };
  }
}
