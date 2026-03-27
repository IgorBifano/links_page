"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { LinkShell } from "@/components/link-shell";

type PremiumCtaProps = {
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    badge: string;
  };
};

export function PremiumCta({ cta }: PremiumCtaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
    >
      <LinkShell
        href={cta.href}
        className="group relative block overflow-hidden rounded-[2rem] border border-accent/20 bg-gradient-to-br from-accent/12 via-white/5 to-transparent p-6 shadow-glow transition hover:-translate-y-1 sm:p-8"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-cyan-400/5 opacity-0 transition group-hover:opacity-100" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs uppercase tracking-[0.28em] text-accent/80">
              <BadgeCheck className="h-3.5 w-3.5" />
              {cta.eyebrow}
            </div>
            <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">
              {cta.title}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {cta.description}
            </p>
          </div>
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/25 px-5 py-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-muted">Acesso</p>
              <p className="mt-2 text-sm font-semibold text-white">{cta.badge}</p>
            </div>
            <div className="rounded-full border border-accent/25 p-3 text-accent transition group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowUpRight className="h-5 w-5" />
            </div>
          </div>
        </div>
      </LinkShell>
    </motion.div>
  );
}
