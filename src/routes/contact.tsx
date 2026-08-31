import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/PageHero";
import { SITE } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Rural Digital Literacy" },
      { name: "description", content: "Contact the digital literacy mission centre by form, phone or email, or visit the district office." },
      { property: "og:title", content: "Contact the Digital Literacy Mission" },
      { property: "og:description", content: "Reach trainers and coordinators for batches, doubts and partnerships." },
    ],
  }),
  component: ContactPage,
});

const EMPTY = { name: "", email: "", phone: "", subject: "", message: "" };

function ContactPage() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 3) e.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";
    if (form.subject.trim().length < 3) e.subject = "Subject is too short.";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please check the form fields.");
      return;
    }
    toast.success("Thank you! Our coordinator will reply within two working days.");
    setForm(EMPTY);
  };

  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <div>
      <PageHero eyebrow="Contact" title="Talk to the mission team" subtitle="Questions about batches, trainers or partnerships? Write to us." />
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <form onSubmit={submit} className="space-y-4" noValidate>
              {(
                [
                  ["name", "Name", "Your full name"],
                  ["email", "Email", "you@example.com"],
                  ["phone", "Phone", "9876543210"],
                  ["subject", "Subject", "Batch enquiry"],
                ] as const
              ).map(([k, label, ph]) => (
                <div key={k}>
                  <Label htmlFor={k}>{label}</Label>
                  <Input id={k} className="mt-1.5" placeholder={ph} value={form[k]} onChange={set(k)} />
                  {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
                </div>
              ))}
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} className="mt-1.5" placeholder="How can we help?" value={form.message} onChange={set("message")} />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-1 size-4" /> Send message
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Google Maps placeholder */}
          <div className="grid h-56 place-items-center rounded-2xl border bg-muted text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="size-4 text-primary" /> Google Maps embed placeholder
            </span>
          </div>
          <Card>
            <CardContent className="space-y-4 pt-6 text-sm">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> {SITE.address}
              </p>
              <p className="flex gap-3">
                <Phone className="size-4 shrink-0 text-primary" /> {SITE.phone}
              </p>
              <p className="flex gap-3">
                <Mail className="size-4 shrink-0 text-primary" /> {SITE.email}
              </p>
              <div className="flex gap-3 pt-2">
                {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
                  <a key={i} href="#" aria-label="Social media" className="grid size-9 place-items-center rounded-full border transition hover:bg-primary hover:text-primary-foreground">
                    <I className="size-4" />
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
