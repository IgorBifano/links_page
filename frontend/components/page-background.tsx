export function PageBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-grid bg-[size:36px_36px] opacity-[0.06]" />
      <div className="grain-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute left-[-12rem] top-[-8rem] h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-40 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
    </>
  );
}
