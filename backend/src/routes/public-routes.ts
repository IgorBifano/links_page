import { Router } from "express";
import { ZodError } from "zod";
import { captureLeadSchema } from "@/schemas/lead-schema";
import {
  LeadAlreadyExistsError,
  LeadUnsubscribedError,
  leadCaptureService
} from "@/services/lead-capture-service";
import {
  UnsubscribeTokenNotFoundError,
  unsubscribeService
} from "@/services/unsubscribe-service";

export const publicRoutes = Router();

publicRoutes.get("/health", (_request, response) => {
  response.json({ ok: true });
});

publicRoutes.post("/leads", (request, response) => {
  try {
    const payload = captureLeadSchema.parse(request.body);
    const lead = leadCaptureService.capture(payload);

    response.status(201).json({
      message:
        "Cadastro realizado com sucesso. Voce entrou na lista e vai receber as proximas atualizacoes.",
      lead: {
        id: lead.id,
        email: lead.email,
        origin: lead.origin,
        status: lead.status
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      response.status(400).json({
        error: "Invalid payload",
        issues: error.flatten()
      });
      return;
    }

    if (error instanceof LeadAlreadyExistsError) {
      response.status(409).json({
        error: "Lead already exists",
        message:
          "Esse e-mail ja esta na lista. Em breve voce vai receber as proximas atualizacoes.",
        lead: {
          email: error.lead.email,
          status: error.lead.status
        }
      });
      return;
    }

    if (error instanceof LeadUnsubscribedError) {
      response.status(409).json({
        error: "Lead unsubscribed",
        message:
          "Esse e-mail esta descadastrado. Entre em contato se quiser reativar o recebimento."
      });
      return;
    }

    response.status(500).json({
      error: "Internal server error"
    });
  }
});

publicRoutes.post("/leads/unsubscribe", (request, response) => {
  const token = typeof request.body?.token === "string" ? request.body.token : "";

  try {
    const lead = unsubscribeService.unsubscribe(token);

    response.json({
      message: "Seu descadastro foi concluido com sucesso.",
      lead: {
        email: lead?.email,
        status: lead?.status
      }
    });
  } catch (error) {
    if (error instanceof UnsubscribeTokenNotFoundError) {
      response.status(404).json({
        error: "Token not found"
      });
      return;
    }

    response.status(500).json({
      error: "Internal server error"
    });
  }
});
