import { env } from "@/config/env";
import type { Lead } from "@/types/lead";

export type EmailCampaign = {
  id: "waitlist-entry" | "course-introduction";
  subject: string;
  previewText: string;
  buildHtml: (lead: Lead) => string;
  buildText: (lead: Lead) => string;
};

function unsubscribeUrl(lead: Lead) {
  return `${env.FRONTEND_BASE_URL.replace(/\/$/, "")}/unsubscribe?token=${lead.unsubscribeToken}`;
}

export const emailCampaigns: Record<EmailCampaign["id"], EmailCampaign> = {
  "waitlist-entry": {
    id: "waitlist-entry",
    subject: "Sua entrada na lista da Formacao Engenharia de Aplicacao foi confirmada",
    previewText: "Recebemos seu interesse e voce vai receber as proximas atualizacoes.",
    buildHtml: (lead) => `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h1 style="font-size:24px;margin-bottom:16px">Ola, ${lead.name}.</h1>
        <p>Seu cadastro na lista da Formacao Engenharia de Aplicacao foi recebido com sucesso.</p>
        <p>Nas proximas mensagens voce vai receber atualizacoes sobre proposta, abertura de vagas e etapas de inscricao.</p>
        <p style="margin-top:24px">Origem registrada: <strong>${lead.origin}</strong></p>
        <p style="margin-top:32px;font-size:12px;color:#6b7280">
          Se quiser parar de receber mensagens, use este link:
          <a href="${unsubscribeUrl(lead)}">${unsubscribeUrl(lead)}</a>
        </p>
      </div>
    `,
    buildText: (lead) =>
      [
        `Ola, ${lead.name}.`,
        "",
        "Seu cadastro na lista da Formacao Engenharia de Aplicacao foi recebido com sucesso.",
        "Nas proximas mensagens voce vai receber atualizacoes sobre proposta, abertura de vagas e etapas de inscricao.",
        "",
        `Origem registrada: ${lead.origin}`,
        "",
        `Descadastro: ${unsubscribeUrl(lead)}`
      ].join("\n")
  },
  "course-introduction": {
    id: "course-introduction",
    subject: "O que voce pode esperar da Formacao Engenharia de Aplicacao",
    previewText: "Uma visao objetiva da proposta, profundidade tecnica e foco em execucao.",
    buildHtml: (lead) => `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827">
        <h1 style="font-size:24px;margin-bottom:16px">Bem-vindo a proxima etapa, ${lead.name}.</h1>
        <p>A formacao foi pensada para combinar engenharia de software, IA aplicada e construcao de sistemas reais.</p>
        <p>O objetivo e sair da teoria solta e entrar em execucao com criterio tecnico, arquitetura e visao de produto.</p>
        <p>Em breve voce vai receber novidades sobre abertura de vagas e detalhes da jornada.</p>
        <p style="margin-top:32px;font-size:12px;color:#6b7280">
          Descadastro:
          <a href="${unsubscribeUrl(lead)}">${unsubscribeUrl(lead)}</a>
        </p>
      </div>
    `,
    buildText: (lead) =>
      [
        `Bem-vindo a proxima etapa, ${lead.name}.`,
        "",
        "A formacao foi pensada para combinar engenharia de software, IA aplicada e construcao de sistemas reais.",
        "O objetivo e sair da teoria solta e entrar em execucao com criterio tecnico, arquitetura e visao de produto.",
        "Em breve voce vai receber novidades sobre abertura de vagas e detalhes da jornada.",
        "",
        `Descadastro: ${unsubscribeUrl(lead)}`
      ].join("\n")
  }
};
