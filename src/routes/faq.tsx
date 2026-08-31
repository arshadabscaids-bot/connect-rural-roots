import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/site/PageHero";
import { FAQS } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Rural Digital Literacy" },
      { name: "description", content: "Answers about eligibility, fees, languages, certificates and reporting online fraud in the rural digital literacy programme." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Common questions about joining, fees, certificates and course languages." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <div>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" subtitle="Everything learners and trainers ask most often." />
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
