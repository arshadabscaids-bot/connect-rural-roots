/** Shared page banner used by every inner page. */
export function PageHero({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <header className="gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 text-center sm:py-20">
        {eyebrow && (
          <span className="inline-block rounded-full bg-primary-foreground/15 px-4 py-1 text-xs font-semibold tracking-widest text-primary-foreground uppercase">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 text-3xl font-bold text-primary-foreground sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-sm text-primary-foreground/85 sm:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
