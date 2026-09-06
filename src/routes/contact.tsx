import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Faq } from "@/components/sections/Faq";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { BUSINESS, LOCATIONS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking | Bro 502 Barber Seattle" },
      {
        name: "description",
        content:
          "Visit Bro 502 Barber in Seattle. Rainier: 3867 Rainier Ave S. Georgetown: 1215 S Bailey St. Call (409) 932-6544, see opening hours, or book online.",
      },
      { property: "og:title", content: "Contact & Booking | Bro 502 Barber Seattle" },
      {
        property: "og:description",
        content: "Seattle's premium grooming lounge. Call (409) 932-6544 or book online.",
      },
    ],
  }),
  component: Contact,
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Contact() {
  const { openBooking, selectedLocation } = useBooking();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mapLocation, setMapLocation] = useState<"rainier" | "georgetown">(selectedLocation);

  useEffect(() => {
    setMapLocation(selectedLocation);
  }, [selectedLocation]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!emailRe.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) next.message = "Please tell us a little more.";
    setErrors(next);
    if (Object.keys(next).length) return;
    toast.success("Message sent", {
      description: "Thanks — we'll reply within one business day.",
    });
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <>
      <PageHeader
        eyebrow="Visit Us"
        title="Contact & booking"
        intro="Find us in Rainier or Georgetown. Book online any time, or send us a note."
      />
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 md:px-8">
          <Reveal variant="slide-left">
            <h2 className="font-serif text-3xl sm:text-4xl">Our lounges</h2>
            <div className="rule-gold mt-6 max-w-24" aria-hidden="true" />

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {LOCATIONS.map((l) => (
                <div
                  key={l.id}
                  className="border border-border/80 p-5 rounded-sm bg-card/60 gold-glow-hover"
                >
                  <h3 className="font-serif text-lg text-gold flex items-center gap-1.5">
                    <MapPin className="size-4 shrink-0 animate-pulse" aria-hidden="true" />
                    {l.shortName}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/90">
                    <a
                      href={l.mapLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="hover:underline"
                    >
                      {l.address}
                    </a>
                  </p>
                  <p className="mt-4 text-[0.6rem] tracking-[0.2em] text-gold uppercase font-medium">
                    Hours:
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                    {l.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span className="text-foreground/80 font-medium">{h.hours}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm border-t border-border/60 pt-6">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-gold shrink-0" aria-hidden="true" />
                <a href={BUSINESS.phoneHref} className="hover:text-gold font-medium">
                  {BUSINESS.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-gold shrink-0" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold font-medium">
                  {BUSINESS.email}
                </a>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GoldButton onClick={() => openBooking()}>Book Now</GoldButton>
              {BUSINESS.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  <GoldButton variant="outline">{s.label}</GoldButton>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scale-up" delay={0.15}>
            <form onSubmit={submit} className="lux-card p-8 rounded-sm gold-glow-hover" noValidate>
              <h2 className="font-serif text-3xl">Send a note</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Questions about a service, a group booking or a gift card? We're happy to help.
              </p>
              <div className="mt-7 space-y-5">
                <label className="block">
                  <span className="eyebrow">Name</span>
                  <Input
                    className="mt-2"
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  {errors.name ? (
                    <span className="mt-1.5 block text-xs text-destructive">{errors.name}</span>
                  ) : null}
                </label>
                <label className="block">
                  <span className="eyebrow">Email</span>
                  <Input
                    className="mt-2"
                    inputMode="email"
                    value={form.email}
                    maxLength={255}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  {errors.email ? (
                    <span className="mt-1.5 block text-xs text-destructive">{errors.email}</span>
                  ) : null}
                </label>
                <label className="block">
                  <span className="eyebrow">Message</span>
                  <Textarea
                    className="mt-2"
                    rows={5}
                    value={form.message}
                    maxLength={1000}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  {errors.message ? (
                    <span className="mt-1.5 block text-xs text-destructive">{errors.message}</span>
                  ) : null}
                </label>
              </div>
              <div className="mt-8">
                <GoldButton type="submit" size="lg" className="w-full">
                  Send message
                </GoldButton>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="surface-linen border-y border-border py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Find us" title="Interactive map" />
            <div className="flex gap-2 mb-2">
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setMapLocation(l.id)}
                  className={`border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${mapLocation === l.id
                      ? "border-gold bg-gold/10 text-gold font-medium"
                      : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {l.shortName}
                </button>
              ))}
            </div>
          </div>

          <Reveal
            delay={0.1}
            variant="scale-up"
            className="mt-12 overflow-hidden border border-border shadow-[var(--shadow-soft)] rounded-sm"
          >
            <iframe
              title={`Map showing Bro 502 Barber at ${LOCATIONS.find((l) => l.id === mapLocation)?.name}`}
              src={LOCATIONS.find((l) => l.id === mapLocation)?.mapEmbed}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}
