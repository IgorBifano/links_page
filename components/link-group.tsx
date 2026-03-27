"use client";

import { motion } from "framer-motion";
import type { LinkGroupType } from "@/data/site-content";
import { LinkCard } from "@/components/link-card";

type LinkGroupProps = {
  group: LinkGroupType;
  index: number;
};

export function LinkGroup({ group, index }: LinkGroupProps) {
  return (
    <motion.section
      id={group.title.toLowerCase()}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-card backdrop-blur"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-2xl text-white">{group.title}</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-muted">
            {group.description}
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
          {String(group.links.length).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-6 grid gap-4">
        {group.links.map((link) => (
          <LinkCard key={link.title} link={link} />
        ))}
      </div>
    </motion.section>
  );
}
