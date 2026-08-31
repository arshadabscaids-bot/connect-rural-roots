import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import { OBJECTIVES } from "@/data/site";

export const Route = createFileRoute("/objectives")({
  head: () => ({
    meta: [
      { title: "Objectives | Rural Digital Literacy" },
      {
        name: "description",
        content:
          "Objectives of the programme: digital awareness, cashless payments, online education, farmer support, cyber safety, government services and jobs.",
      },
      { property: "og:title", content: "Objectives | Rural Digital Literacy" },
      {
        property: "og:description",
        content: "Seven measurable objectives guiding the rural digital literacy programme.",
      },
    ],
  }),
  component: Objectives,
});

function Objectives() {
  return (
    <div>
      <PageHero
        eyebrow="Objectives"
        title="What this programme sets out to achieve"
        subtitle="Each objective maps to specific courses, videos and government services on this site."
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OBJECTIVES.map((o, i) => (
            <Card key={o.title} className="card-hover relative h-full overflow-hidden">
              <span className="absolute top-4 right-5 font-display text-4xl font-bold text-brand-soft">
                {String(i + 1).padStart(2, "0")}
              </span>
              <CardContent className="pt-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon name={o.icon} className="size-5" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{o.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
