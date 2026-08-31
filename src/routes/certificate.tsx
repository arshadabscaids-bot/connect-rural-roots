import { createFileRoute } from "@tanstack/react-router";
import { Award, Download, Leaf } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/certificate")({
  head: () => ({
    meta: [
      { title: "Certificates | Rural Digital Literacy" },
      { name: "description", content: "Download verifiable sample certificates issued after completing digital literacy courses." },
      { property: "og:title", content: "Course Certificates" },
      { property: "og:description", content: "Verifiable digital certificates for completed rural digital literacy courses." },
    ],
  }),
  component: Certificates,
});

const ISSUED = [
  { course: "Computer Basics", date: "18 Jun 2026", id: "DL-2026-CB-00412", status: "Issued" },
  { course: "UPI Mastery", date: "02 Jul 2026", id: "DL-2026-UPI-00987", status: "Issued" },
  { course: "Cyber Security Awareness", date: "—", id: "—", status: "In progress" },
];

function Certificates() {
  return (
    <div>
      <PageHero eyebrow="Certificates" title="Proof of your new skills" subtitle="Every certificate carries a unique ID that employers can verify." />

      <section className="mx-auto max-w-5xl px-4 py-16">
        {/* Sample certificate preview */}
        <div className="relative overflow-hidden rounded-3xl border-4 border-primary/25 bg-card p-8 text-center shadow-card sm:p-14">
          <div className="gradient-hero absolute inset-x-0 top-0 h-2" />
          <Leaf className="mx-auto size-10 text-primary" />
          <p className="mt-4 text-xs tracking-[0.3em] text-muted-foreground uppercase">Certificate of Completion</p>
          <h2 className="mt-4 text-3xl font-bold">Ramesh Naidu</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            has successfully completed the course
          </p>
          <p className="mt-2 text-xl font-semibold text-primary">UPI Mastery</p>
          <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
            Awarded by {SITE.name} on 02 July 2026 · Certificate ID DL-2026-UPI-00987
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={() => toast.success("Sample certificate download started.")}>
              <Download className="mr-1 size-4" /> Download PDF
            </Button>
            <Button variant="outline" onClick={() => toast.info("Verification ID copied for the district office.")}>
              Verify certificate
            </Button>
          </div>
        </div>

        {/* Issued list */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {ISSUED.map((c) => (
            <Card key={c.course} className="card-hover">
              <CardContent className="pt-6">
                <Award className="size-6 text-primary" />
                <h3 className="mt-3 font-semibold">{c.course}</h3>
                <p className="mt-1 text-xs text-muted-foreground">Issued: {c.date}</p>
                <p className="text-xs text-muted-foreground">ID: {c.id}</p>
                <Badge className="mt-3" variant={c.status === "Issued" ? "default" : "secondary"}>
                  {c.status}
                </Badge>
                <Button
                  className="mt-4 w-full"
                  variant="outline"
                  disabled={c.status !== "Issued"}
                  onClick={() => toast.success(`Downloading ${c.course} certificate.`)}
                >
                  <Download className="mr-1 size-4" /> Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
