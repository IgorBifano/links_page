import { leadRepository } from "@/repositories/lead-repository";
import { emailAutomationService } from "@/services/email-automation-service";
import type { Lead } from "@/types/lead";

export class LeadAlreadyExistsError extends Error {
  constructor(public readonly lead: Lead) {
    super("Lead already exists");
  }
}

export class LeadUnsubscribedError extends Error {
  constructor(public readonly lead: Lead) {
    super("Lead is unsubscribed");
  }
}

export const leadCaptureService = {
  capture(input: {
    name: string;
    email: string;
    origin: string;
    sourceCampaign?: string | null;
    consentAccepted: boolean;
  }) {
    const existingLead = leadRepository.findByEmail(input.email);

    if (existingLead?.status === "unsubscribed") {
      throw new LeadUnsubscribedError(existingLead);
    }

    if (existingLead) {
      throw new LeadAlreadyExistsError(existingLead);
    }

    const lead = leadRepository.create(input);
    emailAutomationService.scheduleInitialSequence(lead);

    return lead;
  }
};
