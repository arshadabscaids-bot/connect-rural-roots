import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Leaf, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS, SITE } from "@/data/site";

/** Responsive top navigation with mobile drawer menu. */
export function Navbar() {
  const [open, setOpen] = useState(false);

  const links = NAV_LINKS.map((l) => (
    <Link
      key={l.to}
      to={l.to}
      onClick={() => setOpen(false)}
      activeProps={{ className: "text-primary" }}
      className="rounded-md px-2 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
    >
      {l.label}
    </Link>
  ));

  return (
    <nav className="glass-panel sticky top-0 z-50 w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="text-sm leading-tight font-bold">
            {SITE.short}
            <span className="block text-[11px] font-normal text-muted-foreground">
              for Rural Communication
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">{links}</div>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/register">Register</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="px-4 pt-4">Menu</SheetTitle>
              <div className="flex flex-col gap-1 p-4">
                {links}
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="mt-3 rounded-md border px-3 py-2 text-center text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                >
                  Register
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
