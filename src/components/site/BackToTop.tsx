import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating back-to-top button that appears after scrolling. */
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-5 bottom-5 z-50 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-glow transition hover:scale-110"
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
