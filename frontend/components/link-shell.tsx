"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { isInternalHref } from "@/lib/site";

type LinkShellProps = {
  href: string;
  className: string;
  children: ReactNode;
};

export function LinkShell({ href, className, children }: LinkShellProps) {
  if (isInternalHref(href) && !href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
