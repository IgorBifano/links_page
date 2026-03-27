type FooterProps = {
  footer: {
    statement: string;
    copyright: string;
  };
  socialLinks: Array<{
    label: string;
    href: string;
  }>;
};

export function Footer({ footer, socialLinks }: FooterProps) {
  return (
    <footer className="mt-16 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-display text-2xl text-white">{footer.statement}</p>
          <p className="mt-4 text-sm leading-7 text-muted">{footer.copyright}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-accent/30 hover:text-accent"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
