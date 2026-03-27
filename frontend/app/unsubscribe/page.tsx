"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageBackground } from "@/components/page-background";
import { resolveApiUrl } from "@/lib/site";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUnsubscribe() {
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(resolveApiUrl("/api/leads/unsubscribe"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? "Nao foi possivel concluir o descadastro.");
      }

      setMessage(payload.message ?? "Seu descadastro foi concluido com sucesso.");
    } catch (unsubscribeError) {
      setError(
        unsubscribeError instanceof Error
          ? unsubscribeError.message
          : "Nao foi possivel concluir o descadastro."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-card">
      <p className="font-display text-xs uppercase tracking-[0.38em] text-accent/80">
        Descadastro
      </p>
      <h1 className="mt-5 font-display text-4xl leading-none text-white">
        Gerenciar comunicacoes da lista.
      </h1>
      <p className="mt-5 text-base leading-8 text-slate-300">
        Se voce nao quiser mais receber atualizacoes da formacao, conclua o descadastro
        abaixo.
      </p>

      <button
        onClick={handleUnsubscribe}
        disabled={!token || isSubmitting}
        className="mt-8 inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-accent/30 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processando..." : "Confirmar descadastro"}
      </button>

      {message ? (
        <p className="mt-5 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
          {message}
        </p>
      ) : null}

      {error ? (
        <p className="mt-5 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </p>
      ) : null}
    </section>
  );
}

export default function UnsubscribePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base text-text">
      <PageBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 pb-12 pt-10 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted transition hover:border-accent/30 hover:text-accent"
        >
          Voltar ao hub
        </Link>

        <Suspense
          fallback={
            <section className="mt-12 rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-card text-sm text-muted">
              Carregando configuracao de descadastro...
            </section>
          }
        >
          <UnsubscribeContent />
        </Suspense>
      </div>
    </main>
  );
}
