import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, GraduationCap, Search, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { PageHero } from "@/components/site/PageHero";
import { COURSES } from "@/data/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training Courses | Rural Digital Literacy" },
      {
        name: "description",
        content:
          "Twelve free courses: computer basics, internet, MS Office, digital payments, UPI, cyber security, banking, government services and more.",
      },
      { property: "og:title", content: "Training Courses | Rural Digital Literacy" },
      {
        property: "og:description",
        content: "Enrol in free village digital literacy courses with trainers and durations.",
      },
    ],
  }),
  component: Training;
});

function Training() {
  const [q, setQ] = useState("");
  const [enrolled, setEnrolled] = useState<number[]>([]);

  const list = COURSES.filter((c) => (c.title + c.desc + c.category).toLowerCase().includes(q.toLowerCase()));

  const enroll = (id: number, title: string) => {
    if (enrolled.includes(id)) {
      toast.info(`You are already enrolled in ${title}.`);
      return;
    }
    setEnrolled((e) => [...e, id]);
    toast.success(`Enrolled in ${title}. Your first lesson is now unlocked.`);
  };

  return (
    <div>
      <PageHero
        eyebrow="Training"
        title="Courses that start from zero"
        subtitle="Free, practical, local-language sessions run at village centres and online."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses"
              className="pl-9"
              aria-label="Search courses"
            />
          </div>
          <div className="w-full max-w-xs">
            <p className="mb-2 text-xs text-muted-foreground">
              Your enrolment progress · {enrolled.length}/{COURSES.length}
            </p>
            <Progress value={(enrolled.length / COURSES.length) * 100} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Card key={c.id} className="card-hover flex h-full flex-col">
              <CardContent className="flex flex-1 flex-col pt-6">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold">{c.title}</h2>
                  <Badge variant="secondary">{c.level}</Badge>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.desc}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="size-4 text-primary" /> {c.duration}
                  </li>
                  <li className="flex items-center gap-2">
                    <User className="size-4 text-primary" /> {c.trainer}
                  </li>
                  <li className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-primary" /> {c.category}
                  </li>
                </ul>
                <Button
                  className="mt-5 w-full"
                  variant={enrolled.includes(c.id) ? "secondary" : "default"}
                  onClick={() => enroll(c.id, c.title)}
                >
                  {enrolled.includes(c.id) ? "Enrolled" : "Enroll now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
