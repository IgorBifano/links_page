"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  Instagram,
  Mail,
  MessageCircle,
  Sparkles,
  Star,
  Waves
} from "lucide-react";
import type { LinkItem } from "@/data/site-content";

type LinkCardProps = {
  link: LinkItem;
};

export function LinkCard({ link }: LinkCardProps) {
  const iconMap = {
    graduation: GraduationCap,
    sparkles: Sparkles,
    star: Star,
    briefcase: BriefcaseBusiness,
    waves: Waves,
    file: FileText,
    book: BookOpen,
    message: MessageCircle,
    instagram: Instagram,
    mail: Mail
  } satisfies Record<LinkItem["icon"], typeof GraduationCap>;

  const Icon = iconMap[link.icon];

  return (
    <motion.a
      href={link.href}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-card/90 p-5 shadow-card"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${link.accent} opacity-80`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="rounded-2xl border border-white/10 bg-black/30 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-accent" />
      </div>
      <div className="relative mt-8">
        <h3 className="font-display text-xl text-white">{link.title}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{link.description}</p>
      </div>
    </motion.a>
  );
}
