import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Rural Digital Literacy Project" },
      {
        name: "description",
        content:
          "Project overview, purpose, scope, vision and mission of the Digital Literacy for Rural Communication mini project.",
      },
      { property: "og:title", content: "About the Rural Digital Literacy Project" },
      {
        property: "og:description",
        content: "Why digital literacy matters in rural India — purpose, scope, vision and mission.",
      },
    ],
  }),
  component: About,
});

const SECTIONS = [
  {
    icon: "Info",
    title: "Project Overview",
    body: "A web platform that teaches villagers essential digital skills — using computers and smartphones, making digital payments, staying safe online and reaching government services — through structured courses, videos and guided links.",
  },
  {
    icon: "Target",
    title: "Purpose",
    body: "To close the rural-urban digital divide so that a farmer, a homemaker or a student in a village can complete online tasks independently, without depending on middlemen or paying agents.",
  },
  {
    icon: "Compass",
    title: "Scope",
    body: "Covers 14 skill areas and 12 courses, from computer basics to farmer digital services, delivered in local languages at village common service centres and on personal smartphones.",
  },
  {
    icon: "ShieldCheck",
    title: "Importance in Rural Areas",
    body: "Digital skills protect villagers from OTP and loan frauds, unlock subsidy and scholarship money that already belongs to them, give farmers real mandi prices and open remote employment.",
  },
  {
    icon: "Eye",
    title: "Vision",
    body: "A digitally confident countryside where every household has at least one member able to use online services safely and teach the rest of the family.",
  },
  {
    icon: "Flag",
    title: "Mission",
    body: "Train learners through practical, local-language sessions; certify their skills; and keep an updated directory of official government services they can trust.",
  },
];

function About() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Digital skills built for village life"
        subtitle="A college mini project demonstrating how a well-designed platform can carry digital literacy into rural communication."
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTIONS.map((s) => (
            <Card key={s.title} className="card-hover h-full">
              <CardContent className="pt-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon name={s.icon} className="size-5" />
                </span>
                <h2 className="mt-4 text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
