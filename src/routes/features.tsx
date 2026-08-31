import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import { FEATURES } from "@/data/site";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features | Rural Digital Literacy" },
      {
        name: "description",
        content:
          "Fourteen platform features covering online learning, UPI, cyber security, e-government services, farmer information and women's empowerment.",
      },
      { property: "og:title", content: "Features | Rural Digital Literacy" },
      {
        property: "og:description",
        content: "Explore all fourteen features of the rural digital literacy platform.",
      },
    ],
  }),
  component: Features,
});

function Features() {
  const [q, setQ] = useState("");
  const list = FEATURES.filter(
    (f) =>
      f.title.toLowerCase().includes(q.toLowerCase()) ||
      f.desc.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHero
        eyebrow="Features"
        title="Everything the platform offers"
        subtitle="Search the feature list to find the module you need."
      />
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative mx-auto max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search features, e.g. UPI, safety, farmer"
            className="pl-9"
            aria-label="Search features"
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((f) => (
            <Card key={f.title} className="card-hover h-full">
              <CardContent className="pt-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold">{f.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {list.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">
            No features matched “{q}”. Try another word.
          </p>
        )}
      </section>
    </div>
  );
}
