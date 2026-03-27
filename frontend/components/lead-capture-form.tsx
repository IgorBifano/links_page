"use client";

import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle, ShieldCheck } from "lucide-react";
import { resolveApiUrl } from "@/lib/site";

type LeadCaptureFormProps = {
  origin: string;
  sourceCampaign?: string | null;
};

type FormState = {
  name: string;
  email: string;
  consentAccepted: boolean;
};

export function LeadCaptureForm({
  origin,
  sourceCampaign = "formacao-engenharia-aplicacao"
}: LeadCaptureFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    consentAccepted: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return form.name.trim().length >= 2 && /\S+@\S+\.\S+/.test(form.email) && form.consentAccepted;
  }, [form]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canSubmit) {
      setError("Preencha nome, e-mail valido e aceite o recebimento das comunicacoes.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await fetch(resolveApiUrl("/api/leads"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          origin,
          sourceCampaign,
          consentAccepted: form.consentAccepted
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Nao foi possivel concluir seu cadastro agora.");
      }

      setFeedback(
        payload.message ??
          "Cadastro realizado com sucesso. Voce vai receber as proximas atualizacoes por e-mail."
      );
      setForm({
        name: "",
        email: "",
        consentAccepted: true
      });
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Nao foi possivel concluir seu cadastro agora."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-card backdrop-blur sm:p-8"
    >
      <div className="grid gap-4">
        <label className="grid gap-2 text-sm text-slate-200">
          Nome
          <input
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
            placeholder="Seu nome"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-accent/40"
          />
        </label>

        <label className="grid gap-2 text-sm text-slate-200">
          E-mail
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="voce@empresa.com"
            className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-base text-white outline-none transition focus:border-accent/40"
          />
        </label>

        <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={form.consentAccepted}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                consentAccepted: event.target.checked
              }))
            }
            className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent accent-[#5df2c9]"
          />
          <span>
            Aceito receber e-mails sobre a formacao, abertura de vagas e comunicacoes relacionadas.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/15 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        Entrar na lista com prioridade
      </button>

      <div className="mt-4 flex items-start gap-2 text-xs text-muted">
        <ShieldCheck className="mt-0.5 h-4 w-4 text-accent" />
        <span>Seus dados ficam protegidos e voce pode se descadastrar depois.</span>
      </div>

      {feedback ? (
        <p className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
          {feedback}
        </p>
      ) : null}

      {error ? (
        <p className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}
    </form>
  );
}
