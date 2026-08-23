import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MapPin, ChevronDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useBooking } from "@/components/booking/BookingContext";
import logoSrc from "@/assets/logo.png";
import { GoldButton } from "@/components/ui/GoldButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
            ? "inset-x-4 top-3 md:inset-x-8 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-[min(940px,calc(100vw-4rem))]"
            : "inset-x-0 top-0"
        }`}
      >
        <motion.div
          layout
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            scrolled
              ? "rounded-full border border-border bg-background/95 dark:bg-card/95 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        >
          <nav
            className={`mx-auto grid grid-cols-[1fr_auto] items-center gap-4 transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
              scrolled ? "px-4 py-2.5 md:px-6" : "max-w-7xl px-5 py-4 md:px-8"
            }`}
            aria-label="Main"
          >
            {/* Logo & Location Dropdown */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                to="/"
                className="flex shrink-0 items-center gap-2.5 group"
                onClick={() => setMenuOpen(false)}
              >
                <div className="rounded-full border border-white/40 p-1 bg-zinc-950/90 transition-all duration-300 group-hover:border-white/60 group-hover:scale-105 shadow-[0_0_15px_rgba(255,255,255,0.25)]">
                  <img
                    src={logoSrc}
                    alt="Bro 502 Barbershop – Gentlemen's Club"
                    className={`object-contain transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                      scrolled ? "h-8 w-8" : "h-11 w-11"
                    }`}
                  />
                </div>
                <span className={`font-serif tracking-tight transition-all duration-500 leading-none ${scrolled ? "text-xl" : "text-2xl sm:text-3xl"}`}>
                  <span className="text-white font-bold group-hover:text-zinc-200">Bro</span>
                  <span className="text-red-500 font-extrabold drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]">502</span>
                </span>
              </Link>

              <div
                className={`flex items-center gap-1.5 border-l pl-3 shrink-0 transition-colors duration-500 ${
                  scrolled ? "border-border" : "border-border"
                }`}
              >
                <MapPin
                  className="size-3 shrink-0 animate-pulse text-red-500"
                  aria-hidden="true"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1.5 text-[0.65rem] font-medium tracking-[0.2em] uppercase text-foreground/90 hover:text-white transition-colors focus:outline-none cursor-pointer group py-1">
                    <span>{selectedLocation === "rainier" ? "Rainier" : "Georgetown"}</span>
                    <ChevronDown className="size-3 text-red-500 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    sideOffset={8}
                    className="min-w-[140px] border border-zinc-800 bg-zinc-950/98 p-1.5 shadow-2xl rounded-lg z-[100] backdrop-blur-xl"
                  >
                    <DropdownMenuItem
                      onClick={() => setSelectedLocation("rainier")}
                      className={`cursor-pointer px-3 py-2 text-[0.68rem] tracking-[0.18em] uppercase font-medium rounded-md transition-colors focus:bg-red-600/20 focus:text-white ${
                        selectedLocation === "rainier"
                          ? "bg-red-600/15 text-red-400 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        Rainier
                        {selectedLocation === "rainier" && (
                          <Check className="size-3.5 text-red-500" />
                        )}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setSelectedLocation("georgetown")}
                      className={`cursor-pointer px-3 py-2 text-[0.68rem] tracking-[0.18em] uppercase font-medium rounded-md transition-colors focus:bg-red-600/20 focus:text-white ${
                        selectedLocation === "georgetown"
                          ? "bg-red-600/15 text-red-400 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                      }`}
                    >
                      <span className="flex items-center justify-between w-full">
                        Georgetown
                        {selectedLocation === "georgetown" && (
                          <Check className="size-3.5 text-red-500" />
                        )}
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Desktop Links & Controls */}
            <div className="hidden items-center gap-5 lg:flex">
              <ul className="flex items-center gap-5">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{ className: "text-red-500 font-semibold" }}
                      className="relative text-[0.68rem] tracking-[0.22em] uppercase transition-colors duration-300 group text-foreground/80 hover:text-foreground"
                    >
                      {l.label}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-red-600 transition-all duration-300 group-hover:w-full" />
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

            {/* Mobile Controls (Hamburger) */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="shrink-0 rounded-full border border-border p-2 text-foreground hover:border-foreground/60 transition-colors duration-300"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
              </button>
            </div>
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
                  ? "mt-2 rounded-2xl border border-border bg-background/95 dark:bg-card/95 backdrop-blur-xl shadow-2xl"
                  : "border-t border-border bg-background/97 backdrop-blur-xl"
              }`}
            >
              <ul className="space-y-1 px-5 py-5">
                {LINKS.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      activeOptions={{ exact: l.to === "/" }}
                      activeProps={{ className: "text-primary font-bold" }}
                      onClick={() => setMenuOpen(false)}
                      className="block py-2.5 font-serif text-xl transition-colors text-foreground hover:text-primary"
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
