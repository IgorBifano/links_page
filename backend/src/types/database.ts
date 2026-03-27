export type LeadRow = {
  id: string;
  name: string;
  email: string;
  origin: string;
  status: string;
  email_confirmed: number;
  confirmation_token: string | null;
  unsubscribe_token: string;
  tags: string;
  source_campaign: string | null;
  internal_notes: string | null;
  last_interaction_at: string | null;
  consent_accepted: number;
  created_at: string;
  updated_at: string;
};

export type EmailLogRow = {
  id: string;
  lead_id: string;
  campaign_id: string;
  subject: string;
  status: "sent" | "failed" | "skipped";
  provider: string;
  provider_message_id: string | null;
  error_message: string | null;
  created_at: string;
};

export type EmailAutomationJobRow = {
  id: string;
  lead_id: string;
  campaign_id: "waitlist-entry" | "course-introduction";
  scheduled_for: string;
  status: string;
  attempts: number;
  last_error: string | null;
  created_at: string;
  updated_at: string;
};
