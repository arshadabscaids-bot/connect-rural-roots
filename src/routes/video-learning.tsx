import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHero } from "@/components/site/PageHero";
import { VIDEO_CATEGORIES, VIDEOS, type Video } from "@/data/site";

export const Route = createFileRoute("/video-learning")({
  head: () => ({
    meta: [
      { title: "Video Learning | Rural Digital Literacy" },
      {
        name: "description",
        content:
          "Categorised learning videos on computer basics, internet, digital payments, cyber security, banking, government and farmer services.",
      },
      { property: "og:title", content: "Video Learning | Rural Digital Literacy" },
      {
        property: "og:description",
        content: "Short low-bandwidth video tutorials for rural digital skills.",
      },
    ],
  }),
  component: VideoLearning,
});

function VideoLearning() {
  const [active, setActive] = useState<Video | null>(null);

  return (
    <div>
      <PageHero
        eyebrow="Video Learning"
        title="Watch, pause, practise"
        subtitle="Short tutorials grouped by topic, designed to load on slow rural connections."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        {VIDEO_CATEGORIES.map((cat) => {
          const items = VIDEOS.filter((v) => v.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-14">
              <h2 className="text-2xl font-bold">{cat}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((v) => (
                  <Card key={v.title} className="card-hover overflow-hidden pt-0">
                    {/* Thumbnail placeholder — replace embedId with a real YouTube ID */}
                    <div className="gradient-hero relative grid h-40 place-items-center">
                      <PlayCircle className="size-12 text-primary-foreground/90" />
                      <Badge className="absolute right-3 bottom-3 bg-background/85 text-foreground">
                        <Clock className="mr-1 size-3" />
                        {v.duration}
                      </Badge>
                    </div>
                    <CardContent>
                      <h3 className="font-semibold">{v.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                      <Button className="mt-4 w-full" onClick={() => setActive(v)}>
                        Watch video
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{active?.title}</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            {/* iframe placeholder: swap embedId for a real YouTube video ID */}
            <iframe
              title={active?.title ?? "Lesson video"}
              src={`https://www.youtube.com/embed/${active?.embedId ?? ""}`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="text-sm text-muted-foreground">{active?.desc}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
