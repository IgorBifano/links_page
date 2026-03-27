import { z } from "zod";
import { leadStatuses } from "@/types/lead";

export const captureLeadSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome"),
  email: z.string().trim().email("Informe um e-mail valido"),
  origin: z.string().trim().min(2).max(50),
  sourceCampaign: z.string().trim().max(100).optional().nullable(),
  consentAccepted: z.boolean().refine((value) => value, {
    message: "Voce precisa aceitar receber comunicacoes"
  })
});

export const leadListQuerySchema = z.object({
  status: z.enum(leadStatuses).optional(),
  origin: z.string().trim().optional()
});
