import { Router } from "express";
import { requireAdminApiKey } from "@/middleware/admin-auth";
import { emailLogRepository } from "@/repositories/email-log-repository";
import { leadRepository } from "@/repositories/lead-repository";
import { leadListQuerySchema } from "@/schemas/lead-schema";

export const adminRoutes = Router();

adminRoutes.use(requireAdminApiKey);

adminRoutes.get("/leads", (request, response) => {
  const query = leadListQuerySchema.parse(request.query);
  const leads = leadRepository.list(query);

  response.json({ leads });
});

adminRoutes.get("/leads/:leadId/logs", (request, response) => {
  const logs = emailLogRepository.listByLeadId(request.params.leadId);
  response.json({ logs });
});
