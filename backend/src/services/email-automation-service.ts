import { env } from "@/config/env";
import { nowIsoString, addMinutes } from "@/lib/time";
import { emailJobRepository } from "@/repositories/email-job-repository";
import type { Lead } from "@/types/lead";

export const emailAutomationService = {
  scheduleInitialSequence(lead: Lead) {
    emailJobRepository.create({
      leadId: lead.id,
      campaignId: "waitlist-entry",
      scheduledFor: nowIsoString(),
      status: "pending",
      lastError: null
    });

    emailJobRepository.create({
      leadId: lead.id,
      campaignId: "course-introduction",
      scheduledFor: addMinutes(new Date(), env.LEAD_SEQUENCE_DELAY_MINUTES).toISOString(),
      status: "pending",
      lastError: null
    });
  },

  cancelPendingSequence(leadId: string) {
    emailJobRepository.cancelPendingByLeadId(leadId);
  }
};
