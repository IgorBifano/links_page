import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import { env } from "@/config/env";

const databaseDirectory = path.dirname(env.databasePath);
fs.mkdirSync(databaseDirectory, { recursive: true });

export const db = new Database(env.databasePath);

db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    origin TEXT NOT NULL,
    status TEXT NOT NULL,
    email_confirmed INTEGER NOT NULL DEFAULT 0,
    confirmation_token TEXT,
    unsubscribe_token TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    source_campaign TEXT,
    internal_notes TEXT,
    last_interaction_at TEXT,
    consent_accepted INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS email_logs (
    id TEXT PRIMARY KEY,
    lead_id TEXT NOT NULL,
    campaign_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL,
    provider TEXT NOT NULL,
    provider_message_id TEXT,
    error_message TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES leads (id)
  );

  CREATE TABLE IF NOT EXISTS email_automation_jobs (
    id TEXT PRIMARY KEY,
    lead_id TEXT NOT NULL,
    campaign_id TEXT NOT NULL,
    scheduled_for TEXT NOT NULL,
    status TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (lead_id) REFERENCES leads (id)
  );

  CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
  CREATE INDEX IF NOT EXISTS idx_leads_status_origin ON leads(status, origin);
  CREATE INDEX IF NOT EXISTS idx_email_jobs_status_schedule ON email_automation_jobs(status, scheduled_for);
`);
