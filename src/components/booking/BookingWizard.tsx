import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { format } from "date-fns";
import { Check, ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { ANY_BARBER, BARBERS, SERVICES, TIME_SLOTS } from "@/lib/site-data";
import { createBooking, getBookedSlots } from "@/lib/bookings.functions";
import { cn } from "@/lib/utils";

const STEPS = ["Service", "Barber", "Date & Time", "Details", "Review", "Done"] as const;

type Details = { name: string; phone: string; email: string; notes: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[0-9+()\-.\s]{7,25}$/;

export function BookingWizard() {
  const { open, closeBooking, presetServiceId } = useBooking();
  const reduce = useReducedMotion();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [barberId, setBarberId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>({ name: "", phone: "", email: "", notes: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [taken, setTaken] = useState<{ barberId: string; time: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  const submitBooking = useServerFn(createBooking);
  const loadSlots = useServerFn(getBookedSlots);

  const service = SERVICES.find((s) => s.id === serviceId) ?? null;
  const barber =
    barberId === ANY_BARBER.id
      ? { id: ANY_BARBER.id, name: ANY_BARBER.name }
      : (BARBERS.find((b) => b.id === barberId) ?? null);

  useEffect(() => {
    if (open && presetServiceId) setServiceId(presetServiceId);
  }, [open, presetServiceId]);

  useEffect(() => {
    if (!date) return;
    let active = true;
    loadSlots({ data: { date: format(date, "yyyy-MM-dd") } })
      .then((rows) => {
        if (active) setTaken(rows);
      })
      .catch(() => {
        if (active) setTaken([]);
      });
    return () => {
      active = false;
    };
  }, [date, loadSlots]);

  const unavailable = useMemo(() => {
    if (!date) return new Set<string>();
    return new Set(
      taken.filter((t) => barberId === ANY_BARBER.id || t.barberId === barberId).map((t) => t.time),
    );
  }, [taken, barberId, date]);

  function reset() {
    setStep(0);
    setServiceId(null);
    setBarberId(null);
    setDate(undefined);
    setTime(null);
    setDetails({ name: "", phone: "", email: "", notes: "" });
    setErrors({});
    setReference(null);
    setSubmitError(null);
  }

  function validateDetails() {
    const next: Partial<Record<keyof Details, string>> = {};
    if (details.name.trim().length < 2) next.name = "Please enter your full name.";
    if (!phoneRe.test(details.phone.trim())) next.phone = "Enter a valid phone number.";
    if (!emailRe.test(details.email.trim())) next.email = "Enter a valid email address.";
    if (details.notes.length > 600) next.notes = "Notes must be under 600 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const canAdvance =
    (step === 0 && !!serviceId) ||
    (step === 1 && !!barberId) ||
    (step === 2 && !!date && !!time) ||
    step === 3 ||
    step === 4;

  function go(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  }

  async function handleNext() {
    if (step === 3 && !validateDetails()) return;
    if (step === 4) {
      if (!service || !barber || !date || !time) return;
      setSubmitting(true);
      setSubmitError(null);
      try {
        const res = await submitBooking({
          data: {
            serviceId: service.id,
            serviceName: service.name,
            price: service.price,
            duration: service.duration,
            barberId: barber.id,
            barberName: barber.name,
            date: format(date, "yyyy-MM-dd"),
            time,
            name: details.name.trim(),
            phone: details.phone.trim(),
            email: details.email.trim(),
            notes: details.notes.trim(),
          },
        });
        setReference(res.reference);
        go(5);
      } catch {
        setSubmitError("We couldn't save your booking. Please try again or call us.");
      } finally {
        setSubmitting(false);
      }
      return;
    }
    go(step + 1);
  }

  const variants = {
    enter: (d: number) =>
      reduce
        ? { opacity: 0 }
        : { opacity: 0, x: d > 0 ? 60 : -60, rotateY: d > 0 ? 8 : -8 },
    center: { opacity: 1, x: 0, rotateY: 0 },
    exit: (d: number) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: d > 0 ? -60 : 60, rotateY: d > 0 ? -8 : 8 },
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          closeBooking();
          if (reference) setTimeout(reset, 350);
        }
      }}
    >
      <DialogContent className="max-h-[92svh] gap-0 overflow-y-auto border-border bg-card p-0 sm:max-w-2xl">
        <div className="border-b border-border surface-linen px-6 py-5">
          <DialogTitle className="font-serif text-2xl font-normal">
            {step === 5 ? "You're booked" : "Book your chair"}
          </DialogTitle>
          <DialogDescription className="mt-1 text-xs tracking-[0.18em] uppercase">
            Step {Math.min(step + 1, 6)} of 6 — {STEPS[step]}
          </DialogDescription>
          <div className="mt-4 flex gap-1.5" aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "h-0.5 flex-1 rounded-full transition-colors duration-500",
                  i <= step ? "bg-gold" : "bg-border",
                )}
              />
            ))}
          </div>
        </div>

        <div className="px-6 py-6 [perspective:1400px]">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.42, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {step === 0 ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {SERVICES.map((s) => (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => setServiceId(s.id)}
                        className={cn(
                          "w-full rounded-sm border p-4 text-left transition-all duration-400",
                          serviceId === s.id
                            ? "border-gold bg-gold/10"
                            : "border-border hover:border-gold/60",
                        )}
                      >
                        <p className="font-serif text-lg">{s.name}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          ${s.price} · {s.duration} min
                        </p>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              {step === 1 ? (
                <ul className="grid gap-3 sm:grid-cols-2">
                  {[...BARBERS, null].map((b) => {
                    const id = b?.id ?? ANY_BARBER.id;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          onClick={() => setBarberId(id)}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-sm border p-3 text-left transition-all duration-400",
                            barberId === id
                              ? "border-gold bg-gold/10"
                              : "border-border hover:border-gold/60",
                          )}
                        >
                          {b ? (
                            <img
                              src={b.image}
                              alt=""
                              loading="lazy"
                              className="size-12 rounded-full object-cover"
                            />
                          ) : (
                            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-xs text-espresso">
                              Any
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="block truncate font-serif text-base">
                              {b?.name ?? ANY_BARBER.name}
                            </span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {b?.specialty ?? ANY_BARBER.specialty}
                            </span>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : null}

              {step === 2 ? (
                <div className="grid gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => {
                      setDate(d);
                      setTime(null);
                    }}
                    disabled={{ before: new Date() }}
                    className={cn("pointer-events-auto rounded-sm border border-border p-3")}
                  />
                  <div>
                    <p className="eyebrow">Available times</p>
                    {date ? (
                      <ul className="mt-3 grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((t) => {
                          const disabled = unavailable.has(t);
                          return (
                            <li key={t}>
                              <button
                                type="button"
                                disabled={disabled}
                                onClick={() => setTime(t)}
                                className={cn(
                                  "w-full rounded-sm border px-2 py-2 text-xs transition-all duration-300",
                                  disabled
                                    ? "cursor-not-allowed border-border/60 text-muted-foreground/40 line-through"
                                    : time === t
                                      ? "border-gold bg-gold/15 text-foreground"
                                      : "border-border hover:border-gold/60",
                                )}
                              >
                                {t}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">
                        Choose a date to see open chairs.
                      </p>
                    )}
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div className="grid gap-4">
                  <Field label="Full name" error={errors.name}>
                    <Input
                      value={details.name}
                      maxLength={100}
                      onChange={(e) => setDetails({ ...details, name: e.target.value })}
                      placeholder="Keanu Makani"
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Phone" error={errors.phone}>
                      <Input
                        value={details.phone}
                        maxLength={25}
                        inputMode="tel"
                        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                        placeholder="(808) 555-0134"
                      />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <Input
                        value={details.email}
                        maxLength={255}
                        inputMode="email"
                        onChange={(e) => setDetails({ ...details, email: e.target.value })}
                        placeholder="you@email.com"
                      />
                    </Field>
                  </div>
                  <Field label="Notes (optional)" error={errors.notes}>
                    <Textarea
                      value={details.notes}
                      maxLength={600}
                      rows={3}
                      onChange={(e) => setDetails({ ...details, notes: e.target.value })}
                      placeholder="Anything your barber should know?"
                    />
                  </Field>
                </div>
              ) : null}

              {step === 4 ? (
                <div className="space-y-3">
                  <Row label="Service" value={`${service?.name} · $${service?.price}`} onEdit={() => go(0)} />
                  <Row label="Barber" value={barber?.name ?? ""} onEdit={() => go(1)} />
                  <Row
                    label="When"
                    value={date ? `${format(date, "EEEE, d MMMM yyyy")} · ${time}` : ""}
                    onEdit={() => go(2)}
                  />
                  <Row
                    label="Details"
                    value={`${details.name} · ${details.phone} · ${details.email}`}
                    onEdit={() => go(3)}
                  />
                  {details.notes ? (
                    <Row label="Notes" value={details.notes} onEdit={() => go(3)} />
                  ) : null}
                  <p className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
                    <Clock className="size-3.5 text-gold" aria-hidden="true" />
                    Allow {service?.duration} minutes. Please arrive five minutes early.
                  </p>
                  {submitError ? (
                    <p className="text-sm text-destructive" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {step === 5 ? (
                <div className="py-6 text-center">
                  <span className="mx-auto grid size-16 place-items-center rounded-full bg-gold/15">
                    <Check className="size-7 text-gold" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-serif text-2xl">Your chair is reserved</h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    A confirmation is on its way to {details.email}. We look forward to seeing you.
                  </p>
                  <p className="mt-6 eyebrow">Booking reference</p>
                  <p className="mt-1 font-serif text-3xl text-gold">{reference}</p>
                  <p className="mt-6 text-sm text-muted-foreground">
                    {service?.name} with {barber?.name}
                    <br />
                    {date ? format(date, "EEEE, d MMMM yyyy") : ""} at {time}
                  </p>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-6 py-4">
          {step > 0 && step < 5 ? (
            <GoldButton variant="ghost" size="sm" onClick={() => go(step - 1)}>
              <ChevronLeft className="mr-1 inline size-3.5" /> Back
            </GoldButton>
          ) : (
            <span />
          )}
          {step < 5 ? (
            <GoldButton size="md" disabled={!canAdvance || submitting} onClick={handleNext}>
              {submitting ? (
                <Loader2 className="size-4 animate-spin" aria-label="Saving" />
              ) : step === 4 ? (
                "Confirm booking"
              ) : (
                <>
                  Continue <ChevronRight className="ml-1 inline size-3.5" />
                </>
              )}
            </GoldButton>
          ) : (
            <GoldButton
              size="md"
              onClick={() => {
                closeBooking();
                setTimeout(reset, 350);
              }}
            >
              Done
            </GoldButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <span className="mt-2 block">{children}</span>
      {error ? (
        <span className="mt-1.5 block text-xs text-destructive" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function Row({ label, value, onEdit }: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-border/70 pb-3">
      <div className="min-w-0">
        <p className="eyebrow">{label}</p>
        <p className="mt-1 text-sm break-words text-foreground">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-[0.65rem] tracking-[0.18em] text-gold uppercase hover:underline"
      >
        Edit
      </button>
    </div>
  );
}