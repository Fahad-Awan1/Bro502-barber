import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import logoSrc from "@/assets/logo.png";
import { GoldButton } from "@/components/ui/GoldButton";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/barbers", label: "Our Barbers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

const LUXURY_EASE = [0.22, 0.61, 0.36, 1] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openBooking, selectedLocation, setSelectedLocation } = useBooking();
  const routerState = useRouterState();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [routerState.location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Floating Pill Navbar ─────────────────────────────────── */}
      <motion.header
        layout
        transition={{ duration: 0.5, ease: LUXURY_EASE }}
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
          scrolled
            ? "inset-x-4 top-3 md:inset-x-8 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(900px,calc(100vw-4rem))]"
            : "inset-x-0 top-0"
        }`}
      >
        <motion.div
          layout
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            scrolled
              ? "rounded-full border border-gold/20 bg-espresso/90 shadow-[0_8px_32px_-8px_oklch(0.32_0.036_45/0.55),0_0_0_1px_oklch(0.72_0.098_76/0.12)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            className={`mx-auto grid grid-cols-[1fr_auto] items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              scrolled ? "px-4 py-2.5 md:px-6" : "max-w-7xl px-5 py-4 md:px-8"
            }`}
            aria-label="Main"
          >
            {/* Logo */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                className="flex shrink-0 items-center"
                onClick={() => setMenuOpen(false)}
              >
                <img
                  src={logoSrc}
                  alt="Bro 502 Barbershop – Gentlemen's Club"
                  className={`object-contain transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                    scrolled ? "h-10 w-10" : "h-14 w-14"
                  }`}
                />
              </Link>

              <div
                className={`flex items-center gap-1 border-l pl-3 shrink-0 transition-colors duration-500 ${
                  scrolled ? "border-gold/20" : "border-border"
                }`}
              >
                <MapPin
                  className={`size-3 shrink-0 animate-pulse transition-colors duration-500 ${
                    scrolled ? "text-gold" : "text-gold"
                  }`}
                  aria-hidden="true"
                />
                <select
                  value={selectedLocation}
                  onChange={(e) =>
                    setSelectedLocation(e.target.value as "rainier" | "georgetown")
                  }
                  aria-label="Select Barbershop Location"
                  className={`cursor-pointer bg-transparent py-0.5 pr-5 text-[0.65rem] font-medium tracking-[0.2em] uppercase transition-colors focus:outline-none appearance-none ${
                    scrolled
                      ? "text-background/70 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23c5a880' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: "right center",
                    backgroundSize: "1em 1em",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <option value="rainier" className="bg-espresso text-background">
                    Rainier
                  </option>
                  <option value="georgetown" className="bg-espresso text-background">
                    Georgetown
                  </option>
                </select>
              </div>
            </div>

            {/* Desktop Links */}
            <div className="hidden items-center gap-6 lg:flex">
              <ul className="flex items-center gap-6">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{
                        className: scrolled
                          ? "text-gold"
                          : "text-gold",
                      }}
                      className={`relative text-[0.68rem] tracking-[0.22em] uppercase transition-colors duration-300 group ${
                        scrolled
                          ? "text-background/70 hover:text-background"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
              <GoldButton
                size="sm"
                onClick={() => openBooking()}
                className={scrolled ? "scale-90" : ""}
              >
                Book Now
              </GoldButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              className={`shrink-0 rounded-full border p-2 transition-colors duration-300 lg:hidden ${
                scrolled
                  ? "border-gold/30 text-background hover:border-gold"
                  : "border-border text-foreground"
              }`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </nav>
        </motion.div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className={`overflow-hidden lg:hidden ${
                scrolled
                  ? "mt-2 rounded-2xl border border-gold/20 bg-espresso/95 backdrop-blur-xl shadow-[0_8px_32px_-8px_oklch(0.32_0.036_45/0.6)]"
                  : "border-t border-border bg-background/97 backdrop-blur-xl"
              }`}
            >
              <ul className="space-y-1 px-5 py-5">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{ className: "text-gold" }}
                      onClick={() => setMenuOpen(false)}
                      className={`block py-2.5 font-serif text-xl transition-colors ${
                        scrolled ? "text-background/90 hover:text-gold" : "text-foreground"
                      }`}
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
      </motion.header>
    </>
  );
}
