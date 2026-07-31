import { createFileRoute } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/sections/Faq";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { SERVICES } from "@/lib/site-data";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services & Pricing | Bro502 Barbershop Honolulu" },
      {
        name: "description",
        content:
          "Haircuts, beard sculpting, hot towel straight shaves, kids cuts and combo packages at Bro502 Honolulu. See prices and appointment durations.",
      },
      { property: "og:title", content: "Services & Pricing | Bro502 Barbershop" },
      {
        property: "og:description",
        content: "Cuts, shaves and combo rituals with transparent pricing and durations.",
      },
    ],
  }),
  component: Services,
});

function Services() {
  const { openBooking } = useBooking();

  return (
    <>
      <PageHeader
        eyebrow="The Menu"
        title="Services & pricing"
        intro="Every service includes a consultation, hot towel finish and styling. Prices are per visit — no hidden add-ons."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ul className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                delay={(i % 2) * 0.08}
                className="lux-card lux-card-hover flex flex-col p-8"
              >
                {s.tag ? (
                  <span className="mb-4 inline-flex w-fit border border-gold/50 px-3 py-1 text-[0.6rem] tracking-[0.24em] text-gold uppercase">
                    {s.tag}
                  </span>
                ) : null}
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-serif text-2xl sm:text-3xl">{s.name}</h2>
                  <span className="font-serif text-2xl text-gold">${s.price}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <p className="mt-6 flex items-center gap-2 text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase">
                  <Clock className="size-3.5 text-gold" aria-hidden="true" />
                  {s.duration} minutes
                </p>
                <div className="mt-7 pt-2">
                  <GoldButton variant="outline" size="sm" onClick={() => openBooking(s.id)}>
                    Book this service
                  </GoldButton>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="surface-linen border-y border-border py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <Reveal>
            <h2 className="font-serif text-3xl sm:text-4xl">Not sure which to choose?</h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Start the booking flow — we'll walk you through service, barber and time in under a
              minute.
            </p>
            <div className="mt-8 flex justify-center">
              <GoldButton size="lg" onClick={() => openBooking()}>
                Book Now
              </GoldButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}