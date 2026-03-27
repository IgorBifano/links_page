import { env } from "@/config/env";
import type { EmailCampaign } from "@/email/email-campaigns";
import { emailCampaigns } from "@/email/email-campaigns";
import { createEmailProvider } from "@/email/email-provider-factory";
import { emailLogRepository } from "@/repositories/email-log-repository";
import type { Lead } from "@/types/lead";

const provider = createEmailProvider();

export const emailService = {
  async sendCampaign(lead: Lead, campaignId: EmailCampaign["id"]) {
    const campaign = emailCampaigns[campaignId];
    const result = await provider.send({
      from: env.EMAIL_FROM,
      to: lead.email,
      subject: campaign.subject,
      html: campaign.buildHtml(lead),
      text: campaign.buildText(lead)
    });

    emailLogRepository.create({
      leadId: lead.id,
      campaignId,
      subject: campaign.subject,
      status: "sent",
      provider: result.provider,
      providerMessageId: result.messageId,
      errorMessage: null
    });
  },

  logFailure(lead: Lead, campaignId: EmailCampaign["id"], error: unknown) {
    const campaign = emailCampaigns[campaignId];

    emailLogRepository.create({
      leadId: lead.id,
      campaignId,
      subject: campaign.subject,
      status: "failed",
      provider: provider.name,
      providerMessageId: null,
      errorMessage: error instanceof Error ? error.message : "Unknown email error"
    });
  }
};
