import crypto from "node:crypto";
import { db } from "@/lib/database";
import { nowIsoString } from "@/lib/time";
import type { Lead } from "@/types/lead";
import type { LeadRow } from "@/types/database";

function mapLead(row: LeadRow): Lead {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    origin: row.origin,
    status: row.status as Lead["status"],
    emailConfirmed: Boolean(row.email_confirmed),
    confirmationToken: row.confirmation_token,
    unsubscribeToken: row.unsubscribe_token,
    tags: JSON.parse(row.tags) as string[],
    sourceCampaign: row.source_campaign,
    internalNotes: row.internal_notes,
    lastInteractionAt: row.last_interaction_at,
    consentAccepted: Boolean(row.consent_accepted),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export type CreateLeadInput = {
  name: string;
  email: string;
  origin: string;
  sourceCampaign?: string | null;
  consentAccepted: boolean;
};

const insertLeadStatement = db.prepare(`
  INSERT INTO leads (
    id, name, email, origin, status, email_confirmed, confirmation_token,
    unsubscribe_token, tags, source_campaign, internal_notes, last_interaction_at,
    consent_accepted, created_at, updated_at
  ) VALUES (
    @id, @name, @email, @origin, @status, @emailConfirmed, @confirmationToken,
    @unsubscribeToken, @tags, @sourceCampaign, @internalNotes, @lastInteractionAt,
    @consentAccepted, @createdAt, @updatedAt
  )
`);

export const leadRepository = {
  create(input: CreateLeadInput) {
    const timestamp = nowIsoString();
    const lead: Lead = {
      id: crypto.randomUUID(),
      name: input.name,
      email: input.email.toLowerCase(),
      origin: input.origin,
      status: "new",
      emailConfirmed: false,
      confirmationToken: crypto.randomUUID(),
      unsubscribeToken: crypto.randomUUID(),
      tags: ["waitlist", input.origin],
      sourceCampaign: input.sourceCampaign ?? null,
      internalNotes: null,
      lastInteractionAt: timestamp,
      consentAccepted: input.consentAccepted,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    insertLeadStatement.run({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      origin: lead.origin,
      status: lead.status,
      emailConfirmed: Number(lead.emailConfirmed),
      confirmationToken: lead.confirmationToken,
      unsubscribeToken: lead.unsubscribeToken,
      tags: JSON.stringify(lead.tags),
      sourceCampaign: lead.sourceCampaign,
      internalNotes: lead.internalNotes,
      lastInteractionAt: lead.lastInteractionAt,
      consentAccepted: Number(lead.consentAccepted),
      createdAt: lead.createdAt,
      updatedAt: lead.updatedAt
    });

    return lead;
  },

  findByEmail(email: string) {
    const row = db
      .prepare("SELECT * FROM leads WHERE email = ?")
      .get(email.toLowerCase()) as LeadRow | undefined;

    return row ? mapLead(row) : null;
  },

  findById(id: string) {
    const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(id) as LeadRow | undefined;
    return row ? mapLead(row) : null;
  },

  findByUnsubscribeToken(token: string) {
    const row = db
      .prepare("SELECT * FROM leads WHERE unsubscribe_token = ?")
      .get(token) as LeadRow | undefined;

    return row ? mapLead(row) : null;
  },

  updateStatus(id: string, status: Lead["status"]) {
    const timestamp = nowIsoString();
    db.prepare(
      "UPDATE leads SET status = ?, last_interaction_at = ?, updated_at = ? WHERE id = ?"
    ).run(status, timestamp, timestamp, id);

    return this.findById(id);
  },

  list(filters: { status?: string; origin?: string }) {
    const clauses: string[] = [];
    const values: string[] = [];

    if (filters.status) {
      clauses.push("status = ?");
      values.push(filters.status);
    }

    if (filters.origin) {
      clauses.push("origin = ?");
      values.push(filters.origin);
    }

    const query = `
      SELECT * FROM leads
      ${clauses.length ? `WHERE ${clauses.join(" AND ")}` : ""}
      ORDER BY created_at DESC
    `;

    const rows = db.prepare(query).all(...values) as LeadRow[];
    return rows.map(mapLead);
  }
};
