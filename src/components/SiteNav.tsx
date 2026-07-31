import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import { GoldButton } from "@/components/ui/GoldButton";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/barbers", label: "Our Barbers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking } = useBooking();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        scrolled
          ? "border-b border-border/70 bg-background/90 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8"
        aria-label="Main"
      >
        <Link to="/" className="flex min-w-0 items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-serif text-2xl tracking-tight text-foreground">Bro</span>
          <span className="font-serif text-2xl tracking-tight text-gold">502</span>
          <span className="hidden truncate pl-3 text-[0.6rem] tracking-[0.34em] text-muted-foreground uppercase sm:inline">
            Honolulu
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="relative text-[0.72rem] tracking-[0.22em] text-muted-foreground uppercase transition-colors duration-300 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <GoldButton size="sm" onClick={() => openBooking()}>
            Book Now
          </GoldButton>
        </div>

        <button
          type="button"
          className="shrink-0 rounded-sm border border-border p-2 text-foreground lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/97 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-5 py-5">
              {LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "text-gold" }}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 font-serif text-xl text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <GoldButton
                  className="w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    openBooking();
                  }}
                >
                  Book Now
                </GoldButton>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}