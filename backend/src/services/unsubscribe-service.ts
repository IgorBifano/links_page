import { leadRepository } from "@/repositories/lead-repository";
import { emailAutomationService } from "@/services/email-automation-service";

export class UnsubscribeTokenNotFoundError extends Error {
  constructor() {
    super("Unsubscribe token not found");
  }
}

export const unsubscribeService = {
  unsubscribe(token: string) {
    const lead = leadRepository.findByUnsubscribeToken(token);

    if (!lead) {
      throw new UnsubscribeTokenNotFoundError();
    }

    const updatedLead = leadRepository.updateStatus(lead.id, "unsubscribed");
    emailAutomationService.cancelPendingSequence(lead.id);

    return updatedLead;
  }
};
