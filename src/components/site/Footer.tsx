import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Leaf, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { GOV_SERVICES, SITE } from "@/data/site";

/** Site-wide footer with quick links, government links and contact details. */
export function Footer() {
  const quick = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Training", to: "/training" },
    { label: "Video Learning", to: "/video-learning" },
    { label: "Certificates", to: "/certificate" },
    { label: "Feedback", to: "/feedback" },
    { label: "Profile", to: "/profile" },
  ] as const;

  return (
    <footer className="mt-20 border-t bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="font-bold">{SITE.short}</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{SITE.tagline}</p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Twitter, Instagram, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="grid size-9 place-items-center rounded-full border transition hover:bg-primary hover:text-primary-foreground"
              >
                <I className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {quick.map((q) => (
              <li key={q.to}>
                <Link to={q.to} className="transition hover:text-primary">
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Government Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {GOV_SERVICES.slice(0, 7).map((g) => (
              <li key={g.url}>
                <a
                  href={g.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="transition hover:text-primary"
                >
                  {g.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              {SITE.address}
            </li>
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0 text-primary" />
              {SITE.phone}
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 shrink-0 text-primary" />
              {SITE.email}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. College mini project — all content for
        educational demonstration.
      </div>
    </footer>
  );
}
