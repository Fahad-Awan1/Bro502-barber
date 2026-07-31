import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type LocationId = "rainier" | "georgetown";

type BookingCtx = {
  open: boolean;
  presetServiceId?: string;
  openBooking: (serviceId?: string) => void;
  closeBooking: () => void;
  selectedLocation: LocationId;
  setSelectedLocation: (loc: LocationId) => void;
};

const Ctx = createContext<BookingCtx | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetServiceId, setPresetServiceId] = useState<string | undefined>();
  const [selectedLocation, setSelectedLocationState] = useState<LocationId>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedLocation");
      if (saved === "rainier" || saved === "georgetown") {
        return saved;
      }
    }
    return "rainier";
  });

  const setSelectedLocation = useCallback((loc: LocationId) => {
    setSelectedLocationState(loc);
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedLocation", loc);
    }
  }, []);

  const openBooking = useCallback((serviceId?: string) => {
    setPresetServiceId(serviceId);
    setOpen(true);
  }, []);
  const closeBooking = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      presetServiceId,
      openBooking,
      closeBooking,
      selectedLocation,
      setSelectedLocation,
    }),
    [open, presetServiceId, openBooking, closeBooking, selectedLocation, setSelectedLocation],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
