/**
 * AvailabilityTicker
 *
 * A dismissible top announcement bar that shows live-computed
 * "next available slot" information based on current time and
 * the hours data from site-data.ts. No backend required.
 */
import { AnimatePresence, motion } from "framer-motion";
import { X, Scissors } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { LOCATIONS, TIME_SLOTS } from "@/lib/site-data";
import { useBooking } from "@/components/booking/BookingContext";

const LUXURY_EASE = [0.22, 0.61, 0.36, 1] as const;
const SESSION_KEY = "bro502_ticker_dismissed";

/** Parse "9:00 AM" → minutes from midnight */
function parseTime(str: string): number {
  const m = str.trim().match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!m) return 0;
  let h = parseInt(m[1]);
  const min = parseInt(m[2]);
  const ampm = m[3].toUpperCase();
  if (ampm === "PM" && h < 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  return h * 60 + min;
}

/** Format minutes from midnight back to "H:MM AM/PM" */
function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${ampm}`;
}

type LocationStatus = {
  shortName: string;
  isOpen: boolean;
  nextSlot: string | null;
  closingTime: string | null;
};

function computeStatus(locationId: "rainier" | "georgetown"): LocationStatus {
  const loc = LOCATIONS.find((l) => l.id === locationId)!;
  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const dayHours = loc.hours.find((h) => h.day === dayName);
  if (!dayHours) {
    return { shortName: loc.shortName, isOpen: false, nextSlot: null, closingTime: null };
  }

  const parts = dayHours.hours.split("–");
  const openMin = parseTime(parts[0] || "9:00 AM");
  const closeMin = parseTime(parts[1] || "9:00 PM");
  const isOpen = currentMinutes >= openMin && currentMinutes < closeMin;

  // Find next available slot from TIME_SLOTS
  const nextSlot = TIME_SLOTS.find((slot) => {
    const slotMin = parseTime(slot);
    return slotMin > currentMinutes && slotMin + 30 <= closeMin;
  });

  return {
    shortName: loc.shortName,
    isOpen,
    nextSlot: nextSlot ?? null,
    closingTime: parts[1] ? parts[1].trim() : null,
  };
}

export function AvailabilityTicker() {
  const { openBooking } = useBooking();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [statuses, setStatuses] = useState<LocationStatus[]>([]);

  // Check session dismiss state
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = sessionStorage.getItem(SESSION_KEY);
    if (!dismissed) {
      setVisible(true);
    }
    // Compute statuses for both locations
    setStatuses([computeStatus("rainier"), computeStatus("georgetown")]);
  }, []);

  // Rotate between locations every 4s
  useEffect(() => {
    if (!visible || statuses.length < 2) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % 2);
    }, 4000);
    return () => clearInterval(id);
  }, [visible, statuses.length]);

  const dismiss = useCallback(() => {
    setVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "1");
    }
  }, []);

  const current = statuses[activeIndex];

  return (
    <AnimatePresence>
      {visible && current ? (
        <motion.div
          key="ticker"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: LUXURY_EASE }}
          className="relative z-[60] overflow-hidden bg-espresso"
          role="banner"
          aria-label="Location availability"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 md:px-8">
            {/* Status content */}
            <div className="flex min-w-0 flex-1 items-center justify-center gap-2.5">
              <Scissors className="size-3 shrink-0 text-gold" aria-hidden="true" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: LUXURY_EASE }}
                  className="flex flex-wrap items-center gap-x-2 gap-y-0.5"
                >
                  <span className="text-[0.65rem] tracking-[0.24em] text-gold uppercase font-semibold">
                    {current.shortName}
                  </span>
                  <span className="text-background/40">·</span>
                  {current.isOpen ? (
                    <>
                      <span className="flex items-center gap-1 text-[0.65rem] tracking-wider text-background/80">
                        <span className="size-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                        Open now
                      </span>
                      {current.nextSlot && (
                        <>
                          <span className="text-background/40">·</span>
                          <span className="text-[0.65rem] tracking-wider text-background/70">
                            Next slot: <span className="text-gold font-medium">{current.nextSlot}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => openBooking()}
                            className="ml-1 rounded-sm border border-gold/40 px-2 py-0.5 text-[0.6rem] tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold/10 cursor-pointer"
                          >
                            Book →
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <span className="text-[0.65rem] tracking-wider text-background/60">
                      {current.closingTime
                        ? `Closed · Opens 9:00 AM`
                        : "Closed today"}
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators for location cycling */}
              <div className="ml-2 flex gap-1" aria-hidden="true">
                {statuses.map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? "w-3 h-1.5 bg-gold"
                        : "w-1.5 h-1.5 bg-background/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Dismiss */}
            <button
              type="button"
              aria-label="Dismiss availability banner"
              onClick={dismiss}
              className="ml-2 shrink-0 rounded-full p-1 text-background/50 transition-colors hover:text-gold cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
