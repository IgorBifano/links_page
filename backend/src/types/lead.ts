export const leadStatuses = [
  "new",
  "confirmed",
  "active",
  "unsubscribed",
  "bounced",
  "invalid"
] as const;

export const emailJobStatuses = ["pending", "processing", "sent", "failed", "cancelled"] as const;

export type LeadStatus = (typeof leadStatuses)[number];
export type EmailJobStatus = (typeof emailJobStatuses)[number];

export type Lead = {
  id: string;
  name: string;
  email: string;
  origin: string;
  status: LeadStatus;
  emailConfirmed: boolean;
  confirmationToken: string | null;
  unsubscribeToken: string;
  tags: string[];
  sourceCampaign: string | null;
  internalNotes: string | null;
  lastInteractionAt: string | null;
  consentAccepted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type EmailLog = {
  id: string;
  leadId: string;
  campaignId: string;
  subject: string;
  status: "sent" | "failed" | "skipped";
  provider: string;
  providerMessageId: string | null;
  errorMessage: string | null;
  createdAt: string;
};

export type EmailAutomationJob = {
  id: string;
  leadId: string;
  campaignId: "waitlist-entry" | "course-introduction";
  scheduledFor: string;
  status: EmailJobStatus;
  attempts: number;
  lastError: string | null;
  createdAt: string;
  updatedAt: string;
};
