import { emailService } from "@/email/email-service";
import { logger } from "@/lib/logger";
import { nowIsoString } from "@/lib/time";
import { emailJobRepository } from "@/repositories/email-job-repository";
import { leadRepository } from "@/repositories/lead-repository";

const pollIntervalMs = 10_000;

async function processDueJobs() {
  const dueJobs = emailJobRepository.listDue(nowIsoString());

  for (const job of dueJobs) {
    const lead = leadRepository.findById(job.leadId);

    if (!lead || lead.status === "unsubscribed") {
      emailJobRepository.cancelPendingByLeadId(job.leadId);
      continue;
    }

    emailJobRepository.markProcessing(job.id);

    try {
      await emailService.sendCampaign(lead, job.campaignId);
      emailJobRepository.markSent(job.id);
    } catch (error) {
      emailService.logFailure(lead, job.campaignId, error);
      emailJobRepository.markFailed(
        job.id,
        error instanceof Error ? error.message : "Unknown automation error"
      );
      logger.error("Failed to process email automation job", {
        jobId: job.id,
        campaignId: job.campaignId
      });
    }
  }
}

export function startBackgroundJobRunner() {
  void processDueJobs();
  return setInterval(() => {
    void processDueJobs();
  }, pollIntervalMs);
}
