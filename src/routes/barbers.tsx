import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { BARBERS } from "@/lib/site-data";

export const Route = createFileRoute("/barbers")({
  head: () => ({
    meta: [
      { title: "Our Barbers | Meet the Bro502 Team in Honolulu" },
      {
        name: "description",
        content:
          "Meet the four barbers behind Bro502 in Honolulu — specialists in skin fades, textured crops, grey blending and straight razor shaves.",
      },
      { property: "og:title", content: "Our Barbers | Bro502 Honolulu" },
      {
        property: "og:description",
        content: "Specialists in fades, scissor work, grey blending and straight razor shaves.",
      },
    ],
  }),
  component: Barbers,
});

function Barbers() {
  const { openBooking } = useBooking();

  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title="Our barbers"
        intro="Four hands-on specialists, each hired for patience as much as technique. Request your favourite when you book."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BARBERS.map((b, i) => (
              <Reveal as="li" key={b.id} delay={i * 0.08} className="group">
                <div className="overflow-hidden">
                  <img
                    src={b.image}
                    alt={`${b.name}, ${b.role} at Bro502`}
                    width={900}
                    height={1100}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
                  />
                </div>
                <h2 className="mt-6 font-serif text-2xl">{b.name}</h2>
                <p className="mt-1 text-[0.65rem] tracking-[0.22em] text-gold uppercase">
                  {b.role}
                </p>
                <p className="mt-3 text-sm text-foreground/80">{b.specialty}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {b.socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="border border-border px-3 py-1.5 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mt-16 text-center">
            <GoldButton size="lg" onClick={() => openBooking()}>
              Book with your barber
            </GoldButton>
          </Reveal>
        </div>
      </section>
    </>
  );
}