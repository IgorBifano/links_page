"use client";

import { motion } from "framer-motion";

type AuthorityStripProps = {
  items: Array<{
    value: string;
    label: string;
  }>;
};

export function AuthorityStrip({ items }: AuthorityStripProps) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
          className="rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5"
        >
          <p className="font-display text-2xl text-white">{item.value}</p>
          <p className="mt-2 text-sm leading-7 text-muted">{item.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
