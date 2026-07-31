import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type BookingCtx = {
  open: boolean;
  presetServiceId?: string;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetServiceId, setPresetServiceId] = useState<string | undefined>();

  const openBooking = useCallback((serviceId?: string) => {
    setPresetServiceId(serviceId);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, presetServiceId, openBooking, closeBooking }),
    [open, presetServiceId, openBooking, closeBooking],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}