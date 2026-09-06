import { createFileRoute, Link } from "@tanstack/react-router";
import { Scissors, Sparkles, Droplets, ArrowRight } from "lucide-react";
import { ScrollVideoHero } from "@/components/ScrollVideoHero";
import { Reveal, SectionHeading, ImageMaskReveal } from "@/components/Reveal";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { InstagramStrip } from "@/components/sections/InstagramStrip";
import { BeforeAfterSlider } from "@/components/sections/BeforeAfterSlider";
import { GoldButton } from "@/components/ui/GoldButton";
import { useBooking } from "@/components/booking/BookingContext";
import { SERVICES, BUSINESS, LOCATIONS } from "@/lib/site-data";
import interior1 from "@/assets/interior-1.jpg";
import beforeHaircut from "@/assets/before-haircut.png";
import afterHaircut from "@/assets/after-haircut.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bro 502 Barber | Premium Grooming Lounge in Seattle" },
      {
        name: "description",
        content:
          "A premium barbershop in Seattle, WA. Signature cuts, beard sculpting and hot towel shaves — book your chair at Bro 502 Barber at Rainier or Georgetown.",
      },
      { property: "og:title", content: "Bro 502 Barber | Premium Grooming in Seattle" },
      {
        property: "og:description",
        content: "Precision cuts, beard sculpting and hot towel shaves in Seattle, WA.",
      },
    ],
  }),
  component: Index,
});

const HIGHLIGHTS = [
  {
    icon: Scissors,
    title: "Precision Cutting",
    body: "Scissor-over-comb craft and seamless fades, tailored to how your hair actually grows.",
  },
  {
    icon: Droplets,
    title: "Hot Towel Rituals",
    body: "Steamed linen, hand-lathered cream and a single-blade finish. Unhurried, every time.",
  },
  {
    icon: Sparkles,
    title: "Finishing Touch",
    body: "Styled, product-matched and photographed-ready before you leave the chair.",
  },
];

function Index() {
  const { openBooking, selectedLocation, setSelectedLocation } = useBooking();
  const activeLoc = LOCATIONS.find((l) => l.id === selectedLocation) || LOCATIONS[0];

  return (
    <>
      <ScrollVideoHero />

      {/* Intro Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute -top-10 -left-16 size-64 rounded-full bg-gold/10 blur-3xl animate-float-slow"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 bottom-10 size-72 rounded-full bg-sand/60 blur-3xl animate-float-slow [animation-delay:2s]"
          aria-hidden="true"
        />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <Reveal variant="slide-left">
            <p className="eyebrow">Welcome to Bro 502 Barber</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
              A grooming lounge, not a waiting room
            </h2>
            <div className="rule-gold mt-6 max-w-24" aria-hidden="true" />

            {/* Location toggle switcher */}
            <div className="mt-6 flex items-center gap-2">
              <span className="text-[0.6rem] tracking-[0.22em] text-muted-foreground uppercase mr-2 font-medium">
                Select Lounge:
              </span>
              {LOCATIONS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLocation(l.id)}
                  className={`border px-3 py-1 text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer rounded-sm ${selectedLocation === l.id
                      ? "border-gold bg-gold/10 text-gold font-medium shadow-sm"
                      : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                    }`}
                >
                  {l.shortName}
                </button>
              ))}
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              We opened Bro 502 Barber with one idea: a man's haircut should feel like an
              appointment worth keeping. Marble, warm linen and brass — a quiet room where the
              coffee is good and the barber never rushes. Visit us at our {activeLoc.shortName}{" "}
              lounge.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every visit starts with a consultation and ends with a finish you can recreate at
              home.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <GoldButton onClick={() => openBooking()}>Book Appointment</GoldButton>
              <Link to="/about">
                <GoldButton variant="outline">Our Story</GoldButton>
              </Link>
            </div>
          </Reveal>

          <ImageMaskReveal
            src={interior1}
            alt="The Bro502 barbershop interior with cream walls, marble counters and leather chairs"
            width={1600}
            height={1100}
            delay={0.15}
            className="shadow-[var(--shadow-soft)] rounded-sm"
          />
        </div>
      </section>

      {/* Highlights Section */}
      <section className="surface-linen border-y border-border py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="The Craft"
            title="What sets the chair apart"
            intro="Three things we refuse to rush."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal
                as="li"
                key={h.title}
                variant="scale-up"
                delay={i * 0.1}
                className="lux-card lux-card-hover p-8 rounded-sm gold-glow-hover"
              >
                <h.icon className="size-7 text-gold" aria-hidden="true" />
                <h3 className="mt-6 font-serif text-2xl">{h.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{h.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Services" title="Signature offerings" />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s, i) => (
              <Reveal
                as="li"
                key={s.id}
                variant={i % 2 === 0 ? "slide-left" : "slide-right"}
                delay={i * 0.08}
                className="lux-card lux-card-hover p-8 rounded-sm gold-glow-hover"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-2xl">{s.name}</h3>
                  <span className="font-serif text-xl text-gold">${s.price}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <p className="mt-5 text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase font-medium">
                  {s.duration} minutes
                </p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2} className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-gold hover:underline font-medium tracking-wide"
            >
              View the full menu <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Before / After Transformation Slider */}
      <section className="py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Transformations"
            title="From the chair"
            intro="Drag the divider to reveal the difference. Every cut starts with a consultation — and ends here."
          />
          <Reveal delay={0.15} className="mt-10">
            <BeforeAfterSlider
              beforeSrc={beforeHaircut}
              afterSrc={afterHaircut}
              beforeAlt="Overgrown messy hair — before Bro 502 Barber visit"
              afterAlt="Precision fade & styled pompadour — after Bro 502 Barber"
            />
          </Reveal>
        </div>
      </section>

      <Testimonials />
      <InstagramStrip />

      {/* Hours + CTA */}
      <section className="surface-linen border-y border-border py-24 md:py-32 overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-2 md:px-8">
          <Reveal variant="slide-left">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">{activeLoc.shortName} Hours</p>
                <h2 className="mt-4 font-serif text-3xl sm:text-4xl">Open for you</h2>
              </div>

              <div className="flex gap-2">
                {LOCATIONS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setSelectedLocation(l.id)}
                    className={`border px-3 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer rounded-sm ${selectedLocation === l.id
                        ? "border-gold bg-gold/10 text-gold font-medium shadow-sm"
                        : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
                      }`}
                  >
                    {l.shortName}
                  </button>
                ))}
              </div>
            </div>

            <ul className="mt-8 divide-y divide-border">
              {activeLoc.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 py-3 text-sm">
                  <span className="text-muted-foreground">{h.day}</span>
                  <span className="font-medium text-foreground">{h.hours}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal variant="scale-up" delay={0.15} className="flex flex-col justify-center">
            <p className="eyebrow">Ready when you are</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Reserve your chair in {activeLoc.shortName}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {activeLoc.address}
              <br />
              <a href={BUSINESS.phoneHref} className="text-gold hover:underline font-medium">
                {BUSINESS.phone}
              </a>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <GoldButton size="lg" onClick={() => openBooking()}>
                Book Now
              </GoldButton>
              <Link to="/contact">
                <GoldButton size="lg" variant="outline">
                  Find Us
                </GoldButton>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Faq />
    </>
  );
}
