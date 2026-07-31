import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useBooking } from "@/components/booking/BookingContext";

export function FloatingBookButton() {
  const { openBooking, open } = useBooking();

  return (
    <motion.button
      type="button"
      onClick={() => openBooking()}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: open ? 0 : 1, y: open ? 24 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3.5 text-[0.68rem] tracking-[0.2em] text-primary-foreground uppercase shadow-[var(--shadow-lift)] transition-colors duration-500 hover:bg-gold hover:text-accent-foreground"
    >
      <CalendarCheck className="size-4" aria-hidden="true" />
      Book Now
    </motion.button>
  );
}