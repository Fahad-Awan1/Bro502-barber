import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Faq } from "@/components/sections/Faq";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { BUSINESS, HOURS } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Booking | Bro502 Barbershop, Kona St Honolulu" },
      {
        name: "description",
        content:
          "Visit Bro502 at 1430 Kona St #105, Honolulu, HI 96814. Call (808) 949-6081, see opening hours, or book your appointment online.",
      },
      { property: "og:title", content: "Contact & Booking | Bro502 Barbershop Honolulu" },
      {
        property: "og:description",
        content: "1430 Kona St #105, Honolulu. Call (808) 949-6081 or book online.",
      },
    ],
  }),
  component: Contact,
});

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Contact() {
  const { openBooking } = useBooking();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        intro="Find us on Kona Street, a block from Ala Moana. Book online any time, or send us a note."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 md:px-8">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">The shop</h2>
            <div className="rule-gold mt-6 max-w-24" aria-hidden="true" />
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <a href={BUSINESS.mapLink} target="_blank" rel="noreferrer noopener" className="hover:text-gold">
                  {BUSINESS.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <a href={BUSINESS.phoneHref} className="hover:text-gold">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">
                  {BUSINESS.email}
                </a>
              </li>
            </ul>

            <div className="mt-10">
              <p className="eyebrow flex items-center gap-2">
                <Clock className="size-3.5 text-gold" aria-hidden="true" /> Business hours
              </p>
              <ul className="mt-4 divide-y divide-border">
                {HOURS.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4 py-2.5 text-sm">
                    <span className="text-muted-foreground">{h.day}</span>
                    <span>{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <GoldButton onClick={() => openBooking()}>Book Now</GoldButton>
              {BUSINESS.socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  <GoldButton variant="outline">{s.label}</GoldButton>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="lux-card p-8" noValidate>
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

      <section className="surface-linen border-y border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Find us" title="1430 Kona Street" />
          <Reveal delay={0.1} className="mt-12 overflow-hidden border border-border shadow-[var(--shadow-soft)]">
            <iframe
              title="Map showing Bro502 Barbershop at 1430 Kona St #105, Honolulu, HI 96814"
              src={BUSINESS.mapEmbed}
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