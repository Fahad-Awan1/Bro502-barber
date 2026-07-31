import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, SectionHeading } from "@/components/Reveal";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Bro502 | Our Story & Philosophy — Honolulu Barbershop" },
      {
        name: "description",
        content:
          "The story behind Bro502: a Honolulu grooming lounge built on craft, patience and hospitality. Meet our founder and see inside the shop.",
      },
      { property: "og:title", content: "About Bro502 — Honolulu Barbershop" },
      {
        property: "og:description",
        content: "Craft, patience and hospitality on Kona Street. The story behind Bro502.",
      },
    ],
  }),
  component: About,
});

const VALUES = [
  {
    title: "Consultation first",
    body: "Every appointment opens with a conversation. We plan the cut before a blade touches hair.",
  },
  {
    title: "Time, generously given",
    body: "We book fewer chairs per hour than most shops so nobody's visit gets compressed.",
  },
  {
    title: "Hospitality as standard",
    body: "Kona coffee, cold towels, and a room that stays quiet enough to hear yourself think.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Built on Kona Street, in 2014"
        intro="Bro502 began as a two-chair room above a surf shop. A decade later, the philosophy hasn't moved an inch."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <Reveal x={-30} y={0}>
            <img
              src={interior1}
              alt="Interior of Bro502 with cream panelling, gold mirrors and leather barber chairs"
              width={1600}
              height={1100}
              loading="lazy"
              className="w-full object-cover shadow-[var(--shadow-soft)]"
            />
          </Reveal>
          <Reveal x={30} y={0} delay={0.1}>
            <p className="eyebrow">The Founder</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              Kai Mahelona's second chair
            </h2>
            <div className="rule-gold mt-6 max-w-24" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Kai spent a decade cutting in Waikīkī hotel salons — beautiful rooms, impossible
              schedules. He wanted somewhere a guest could sit down and not feel like a slot on a
              spreadsheet. So he found a small unit on Kona Street, laid marble on the counters, and
              hung one gold mirror.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The team has grown to four barbers, each hired for patience as much as technique. We
              still only take as many bookings as we can do properly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="surface-linen border-y border-border py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Philosophy"
            title="Three rules we don't bend"
            intro="They're the reason guests come back for a decade at a time."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.1} className="lux-card lux-card-hover p-8">
                <span className="font-serif text-4xl text-gold/50">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Inside the shop" title="Marble, linen and brass" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <img
                src={gallery6}
                alt="Gold-framed mirror above a marble barber station at Bro502"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover shadow-[var(--shadow-soft)]"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <img
                src={interior2}
                alt="Gold barber scissors, straight razor and badger brush on cream marble"
                width={1200}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover shadow-[var(--shadow-soft)]"
              />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}