"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Orbit } from "lucide-react";

type HeroProps = {
  profile: {
    name: string;
    role: string;
    bio: string;
  };
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  })
};

export function Hero({ profile }: HeroProps) {
  return (
    <section className="grid items-center gap-8 pt-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-10">
      <div>
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-accent/80"
        >
          <Orbit className="h-3.5 w-3.5" />
          Personal Brand Hub
        </motion.div>

        <motion.h1
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-3xl font-display text-4xl leading-none text-white sm:text-6xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          custom={0.16}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-5 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl"
        >
          {profile.role}
        </motion.p>

        <motion.p
          custom={0.24}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base"
        >
          {profile.bio}
        </motion.p>

        <motion.div
          custom={0.32}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a
            href="#aprender"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-3 text-sm font-semibold text-accent shadow-glow transition hover:-translate-y-0.5 hover:bg-accent/15"
          >
            Explorar links
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="inline-flex items-center rounded-full border border-white/10 px-4 py-3 text-sm text-muted">
            IA, educacao e sistemas em uma so pagina
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative mx-auto w-full max-w-sm"
      >
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-cyan-400/10 to-transparent blur-2xl" />
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-card backdrop-blur">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-xs uppercase tracking-[0.24em] text-muted">
            <span>Profile Signal</span>
            <span>2026</span>
          </div>
          <div className="mt-5 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/0 p-6">
            <div className="flex items-center justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-accent/25 bg-gradient-to-br from-accent/15 via-transparent to-cyan-400/10 shadow-glow">
                <div className="absolute inset-4 rounded-full border border-white/10" />
                <span className="font-display text-5xl text-white">IB</span>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                "Software Architecture",
                "Applied AI Systems",
                "Education as leverage"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
