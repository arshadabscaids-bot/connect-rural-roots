import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, Quote, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/site/Icon";
import { ANNOUNCEMENTS, FEATURES, TESTIMONIALS } from "@/data/site";
import heroImage from "@/assets/hero-rural-digital.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Literacy for Rural Communication | Home" },
      {
        name: "description",
        content:
          "Free digital literacy training for villages: computer basics, UPI payments, cyber safety, online banking and government services.",
      },
      { property: "og:title", content: "Digital Literacy for Rural Communication" },
      {
        property: "og:description",
        content: "Free village-first digital skills training, videos and government service guidance.",
      },
    ],
  }),
  component: Home,
});

/** Live clock shown in the hero. */
function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

function Home() {
  const now = useClock();
  const [slide, setSlide] = useState(0);

  // Simple testimonial slideshow
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[slide] ?? TESTIMONIALS[0]!;

  return (
    <div>
      {/* Hero banner */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Badge className="bg-primary-foreground/15 text-primary-foreground">
              Digital India · Rural Mission
            </Badge>
            <h1 className="mt-5 text-4xl leading-tight font-bold text-primary-foreground sm:text-5xl">
              Every village deserves the confidence to go digital
            </h1>
            <p className="mt-5 max-w-xl text-primary-foreground/85">
              Namaste! Learn computers, smartphones, UPI payments, online banking, cyber safety and
              government services in your own language — free, practical and made for rural
              learners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/training">Browse Courses</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs text-primary-foreground/70">
              {now
                ? now.toLocaleString("en-IN", { dateStyle: "full", timeStyle: "medium" })
                : "Loading date and time…"}
            </p>
          </div>
          <div className="animate-float overflow-hidden rounded-3xl shadow-glow">
            <img
              src={heroImage}
              alt="Rural families in India learning digital skills on a laptop and smartphone"
              width={1600}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto -mt-8 max-w-6xl px-4">
        <div className="glass-panel grid gap-4 rounded-2xl p-6 sm:grid-cols-4">
          {[
            { k: "1,248", v: "Learners trained" },
            { k: "12", v: "Courses" },
            { k: "36", v: "Villages covered" },
            { k: "94%", v: "Completion rate" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <p className="text-2xl font-bold text-primary">{s.k}</p>
              <p className="text-xs text-muted-foreground">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Programme Highlights</h2>
          <p className="mt-3 text-muted-foreground">
            Six pillars of the rural digital communication programme.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 6).map((f) => (
            <Card key={f.title} className="card-hover">
              <CardContent className="pt-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button asChild variant="outline">
            <Link to="/features">See all 14 features</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials slideshow */}
      <section className="gradient-soft border-y py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Quote className="mx-auto size-8 text-primary" />
          <p className="mt-6 text-xl leading-relaxed font-medium">“{t.quote}”</p>
          <p className="mt-5 font-semibold">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? "w-6 bg-primary" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold">Latest Announcements</h2>
            <p className="mt-2 text-muted-foreground">News from district training centres.</p>
          </div>
          <Button asChild variant="ghost">
            <Link to="/dashboard">
              <Users className="mr-1 size-4" /> Open dashboard
            </Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {ANNOUNCEMENTS.map((a) => (
            <Card key={a.title} className="card-hover">
              <CardContent className="pt-6">
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarDays className="size-4 text-primary" /> {a.date}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
