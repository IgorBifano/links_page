import type { Metadata } from "next";
import Link from "next/link";
import { LeadCaptureForm } from "@/components/lead-capture-form";
import { PageBackground } from "@/components/page-background";

export const metadata: Metadata = {
  title: "Lista de Espera | Igor Bifano",
  description: "Entre na lista da Formacao Engenharia de Aplicacao."
};

export default function WaitlistPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base text-text">
      <PageBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-5 pb-12 pt-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-muted transition hover:border-accent/30 hover:text-accent"
        >
          Voltar ao hub
        </Link>

        <section className="mt-10 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-2xl">
            <p className="font-display text-xs uppercase tracking-[0.38em] text-accent/80">
              Lista Prioritaria
            </p>
            <h1 className="mt-5 font-display text-4xl leading-none text-white sm:text-6xl">
              Receba primeiro a abertura das vagas da Formacao Engenharia de Aplicacao.
            </h1>
            <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
              Entre na lista para acompanhar a proposta, novidades da jornada e o momento certo
              de inscricao. O foco e profundidade tecnica, IA aplicada e sistemas reais.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                "Aviso de abertura das vagas antes da comunicacao geral",
                "Sequencia inicial com contexto da formacao e proposta",
                "Fluxo preparado para atualizacoes futuras sem ruir a estrutura"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <LeadCaptureForm origin="linkhub" />
        </section>
      </div>
    </main>
  );
}
