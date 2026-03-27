type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-xs uppercase tracking-[0.4em] text-accent/80">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-7 text-muted sm:text-base">
        {description}
      </p>
    </div>
  );
}
