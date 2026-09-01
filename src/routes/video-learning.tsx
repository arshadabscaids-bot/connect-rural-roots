import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clock, ExternalLink, Loader2, PlayCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHero } from "@/components/site/PageHero";
import { VIDEO_CATEGORIES, VIDEO_FILTERS, VIDEOS, type Video } from "@/data/site";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideoLearning,
});

function VideoLearning() {
  const [active, setActive] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return VIDEOS.filter((v) => {
      const matchesFilter = filter === "All" || v.filter === filter;
      const matchesQuery =
        q === "" ||
        v.title.toLowerCase().includes(q) ||
        v.desc.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [query, filter]);

  function open(v: Video) {
    setLoading(true);
    setFailed(false);
    setActive(v);
  }

  return (
    <div>
      <PageHero
        eyebrow="Video Learning"
        title="Watch, pause, practise"
        subtitle="Short tutorials grouped by topic, designed to load on slow rural connections."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos…"
              aria-label="Search videos"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {VIDEO_FILTERS.map((f) => (
              <Button
                key={f.value}
                size="sm"
                variant={filter === f.value ? "default" : "outline"}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-muted-foreground">
            No videos match your search. Try another keyword or category.
          </p>
        )}

        <div className="mt-10">
          {VIDEO_CATEGORIES.map((cat) => {
            const items = visible.filter((v) => v.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-14">
                <h2 className="text-2xl font-bold">{cat}</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((v) => (
                    <Card key={v.videoId} className="card-hover overflow-hidden pt-0">
                      <button
                        type="button"
                        onClick={() => open(v)}
                        className="relative block h-40 w-full overflow-hidden"
                        aria-label={`Play ${v.title}`}
                      >
                        <img
                          src={v.thumbnail}
                          alt={`${v.title} video thumbnail`}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-foreground/25">
                          <PlayCircle className="size-12 text-background" />
                        </span>
                        <Badge className="absolute right-3 bottom-3 bg-background/85 text-foreground">
                          <Clock className="mr-1 size-3" />
                          {v.duration}
                        </Badge>
                      </button>
                      <CardContent>
                        <h3 className="font-semibold">{v.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                        <div className="mt-4 flex gap-2">
                          <Button className="flex-1" onClick={() => open(v)}>
                            Watch video
                          </Button>
                          <Button variant="outline" size="icon" asChild>
                            <a
                              href={v.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${v.title} on YouTube`}
                            >
                              <ExternalLink className="size-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{active?.title}</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
            {active && !failed && (
              <>
                {loading && (
                  <div className="absolute inset-0 grid place-items-center">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                  </div>
                )}
                <iframe
                  key={active.videoId}
                  title={active.title}
                  src={active.embedUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setLoading(false)}
                  onError={() => {
                    setLoading(false);
                    setFailed(true);
                  }}
                />
              </>
            )}
            {active && failed && (
              <div className="absolute inset-0 grid place-items-center gap-3 p-6 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">
                    This video cannot be played inside the site.
                  </p>
                  <Button className="mt-4" asChild>
                    <a href={active.youtubeUrl} target="_blank" rel="noopener noreferrer">
                      Watch on YouTube
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{active?.desc}</p>
          {active && (
            <a
              href={active.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Having trouble? Watch on YouTube
            </a>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
