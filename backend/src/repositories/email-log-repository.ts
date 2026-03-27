import crypto from "node:crypto";
import { db } from "@/lib/database";
import { nowIsoString } from "@/lib/time";
import type { EmailLog } from "@/types/lead";
import type { EmailLogRow } from "@/types/database";

function mapEmailLog(row: EmailLogRow): EmailLog {
  return {
    id: row.id,
    leadId: row.lead_id,
    campaignId: row.campaign_id,
    subject: row.subject,
    status: row.status,
    provider: row.provider,
    providerMessageId: row.provider_message_id,
    errorMessage: row.error_message,
    createdAt: row.created_at
  };
}

export const emailLogRepository = {
  create(input: Omit<EmailLog, "id" | "createdAt">) {
    const log: EmailLog = {
      id: crypto.randomUUID(),
      createdAt: nowIsoString(),
      ...input
    };

    db.prepare(`
      INSERT INTO email_logs (
        id, lead_id, campaign_id, subject, status, provider,
        provider_message_id, error_message, created_at
      ) VALUES (
        @id, @leadId, @campaignId, @subject, @status, @provider,
        @providerMessageId, @errorMessage, @createdAt
      )
    `).run(log);

    return log;
  },

  listByLeadId(leadId: string) {
    const rows = db
      .prepare("SELECT * FROM email_logs WHERE lead_id = ? ORDER BY created_at DESC")
      .all(leadId) as EmailLogRow[];

    return rows.map(mapEmailLog);
  }
};
