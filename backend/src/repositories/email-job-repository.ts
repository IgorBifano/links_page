import crypto from "node:crypto";
import { db } from "@/lib/database";
import { nowIsoString } from "@/lib/time";
import type { EmailAutomationJob } from "@/types/lead";
import type { EmailAutomationJobRow } from "@/types/database";

function mapEmailJob(row: EmailAutomationJobRow): EmailAutomationJob {
  return {
    id: row.id,
    leadId: row.lead_id,
    campaignId: row.campaign_id,
    scheduledFor: row.scheduled_for,
    status: row.status as EmailAutomationJob["status"],
    attempts: row.attempts,
    lastError: row.last_error,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export const emailJobRepository = {
  create(input: Omit<EmailAutomationJob, "id" | "createdAt" | "updatedAt" | "attempts">) {
    const timestamp = nowIsoString();
    const job: EmailAutomationJob = {
      id: crypto.randomUUID(),
      leadId: input.leadId,
      campaignId: input.campaignId,
      scheduledFor: input.scheduledFor,
      status: input.status,
      attempts: 0,
      lastError: input.lastError,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    db.prepare(`
      INSERT INTO email_automation_jobs (
        id, lead_id, campaign_id, scheduled_for, status,
        attempts, last_error, created_at, updated_at
      ) VALUES (
        @id, @leadId, @campaignId, @scheduledFor, @status,
        @attempts, @lastError, @createdAt, @updatedAt
      )
    `).run(job);

    return job;
  },

  listDue(now: string) {
    const rows = db
      .prepare(`
        SELECT * FROM email_automation_jobs
        WHERE status = 'pending' AND scheduled_for <= ?
        ORDER BY scheduled_for ASC
      `)
      .all(now) as EmailAutomationJobRow[];

    return rows.map(mapEmailJob);
  },

  markProcessing(id: string) {
    db.prepare(`
      UPDATE email_automation_jobs
      SET status = 'processing', attempts = attempts + 1, updated_at = ?
      WHERE id = ?
    `).run(nowIsoString(), id);
  },

  markSent(id: string) {
    db.prepare(`
      UPDATE email_automation_jobs
      SET status = 'sent', last_error = NULL, updated_at = ?
      WHERE id = ?
    `).run(nowIsoString(), id);
  },

  markFailed(id: string, errorMessage: string) {
    db.prepare(`
      UPDATE email_automation_jobs
      SET status = 'failed', last_error = ?, updated_at = ?
      WHERE id = ?
    `).run(errorMessage, nowIsoString(), id);
  },

  cancelPendingByLeadId(leadId: string) {
    db.prepare(`
      UPDATE email_automation_jobs
      SET status = 'cancelled', updated_at = ?
      WHERE lead_id = ? AND status IN ('pending', 'processing')
    `).run(nowIsoString(), leadId);
  }
};
