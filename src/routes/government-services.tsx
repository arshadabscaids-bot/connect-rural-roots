import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/site/PageHero";
import { Icon } from "@/components/site/Icon";
import { GOV_SERVICES } from "@/data/site";

export const Route = createFileRoute("/government-services")({
  head: () => ({
    meta: [
      { title: "Government Services | Rural Digital Literacy" },
      {
        name: "description",
        content:
          "Directory of official Indian government digital services: Aadhaar, PAN, DigiLocker, UMANG, PM-Kisan, e-Shram, CoWIN, GeM and more.",
      },
      { property: "og:title", content: "Government Services Directory" },
      {
        property: "og:description",
        content: "Trusted links to fifteen official Indian government digital services.",
      },
    ],
  }),
  component: GovServices,
});

function GovServices() {
  const [q, setQ] = useState("");
  const list = GOV_SERVICES.filter((g) =>
    (g.name + g.desc).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div>
      <PageHero
        eyebrow="Government Services"
        title="Official portals, one trusted place"
        subtitle="All links are stored in a single configuration file so they can be updated centrally when a portal changes."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="relative mx-auto max-w-md">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, e.g. Aadhaar, scholarship"
            className="pl-9"
            aria-label="Search government services"
          />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((g) => (
            <Card key={g.url} className="card-hover flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col pt-6">
                {/* Logo placeholder */}
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon name={g.icon} className="size-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold">{g.name}</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{g.desc}</p>
                <Button asChild className="mt-5 w-full" variant="outline">
                  <a href={g.url} target="_blank" rel="noreferrer noopener">
                    Official website <ExternalLink className="ml-1 size-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
