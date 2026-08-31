import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHero } from "@/components/site/PageHero";
import { COURSES } from "@/data/site";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback | Rural Digital Literacy" },
      { name: "description", content: "Rate courses from one to five stars, leave comments and send suggestions to improve the training programme." },
      { property: "og:title", content: "Share Your Feedback" },
      { property: "og:description", content: "Rate a course and help us improve rural digital training." },
    ],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const [course, setCourse] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) {
      toast.error("Please choose a course.");
      return;
    }
    if (rating === 0) {
      toast.error("Please give a star rating.");
      return;
    }
    if (comment.trim().length < 10) {
      toast.error("Comment must be at least 10 characters.");
      return;
    }
    toast.success("Thank you! Your feedback has been recorded.");
    setCourse("");
    setRating(0);
    setComment("");
    setSuggestion("");
  };

  return (
    <div>
      <PageHero eyebrow="Feedback" title="Tell us how we did" subtitle="Your rating helps trainers improve every batch." />
      <section className="mx-auto max-w-2xl px-4 py-16">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <form onSubmit={submit} className="space-y-6">
              <div>
                <Label>Course</Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger className="mt-1.5 w-full">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSES.map((c) => (
                      <SelectItem key={c.id} value={c.title}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Your rating</Label>
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      aria-label={`${n} star`}
                      onClick={() => setRating(n)}
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        className={`size-8 ${
                          n <= (hover || rating) ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="comment">Comments</Label>
                <Textarea id="comment" rows={4} className="mt-1.5" placeholder="What worked well? What was difficult?" value={comment} onChange={(e) => setComment(e.target.value)} />
              </div>

              <div>
                <Label htmlFor="suggestion">Suggestions (optional)</Label>
                <Textarea id="suggestion" rows={3} className="mt-1.5" placeholder="New topics or timings you would like" value={suggestion} onChange={(e) => setSuggestion(e.target.value)} />
              </div>

              <Button type="submit" className="w-full">
                Submit feedback
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
