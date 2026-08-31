import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Renders a lucide icon by name so icons can live in central config data. */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const icons = Lucide as unknown as Record<string, React.ComponentType<LucideProps>>;
  const Cmp = icons[name] ?? Lucide.Sparkles;
  return <Cmp {...props} />;
}
