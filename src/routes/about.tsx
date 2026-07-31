import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, SectionHeading, ImageMaskReveal } from "@/components/Reveal";
import interior1 from "@/assets/interior-1.jpg";
import interior2 from "@/assets/interior-2.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Bro 502 Barber | Our Story & Philosophy — Seattle Barbershop" },
      {
        name: "description",
        content:
          "The story behind Bro 502 Barber: a Seattle grooming lounge built on craft, patience and hospitality. Meet our founder and see inside the shop.",
      },
      { property: "og:title", content: "About Bro 502 Barber — Seattle Barbershop" },
      {
        property: "og:description",
        content: "Craft, patience and hospitality in Seattle. The story behind Bro 502 Barber.",
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
    body: "Fresh coffee, cold towels, and a room that stays quiet enough to hear yourself think.",
  },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="Our Story"
        title="Built in Seattle, in 2014"
        intro="Bro 502 Barber began as a two-chair room in Seattle. A decade later, the philosophy hasn't moved an inch."
      />

      {/* Founder & Origins Section */}
      <section className="py-24 md:py-32 overflow-hidden bg-texture-grain">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:grid-cols-2 md:px-8">
          <ImageMaskReveal
            src={interior1}
            alt="Interior of Bro 502 Barber with cream panelling, gold mirrors and leather barber chairs"
            width={1600}
            height={1100}
            className="shadow-[var(--shadow-soft)] rounded-sm border border-border/80"
          />

          <Reveal variant="scale-up" delay={0.15}>
            <span className="eyebrow">The Founder</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl text-foreground font-normal">
              Jose Gilberto Morales Simeon
            </h2>
            <p className="mt-2 text-[0.65rem] tracking-[0.24em] text-forest uppercase font-semibold">
              CEO & Founder
            </p>
            <div className="mt-4 h-0.5 w-16 bg-gradient-to-r from-gold to-gold/20" aria-hidden="true" />
            <p className="mt-6 text-base leading-relaxed text-foreground/80 font-normal">
              Jose Gilberto Morales Simeon founded Bro 502 Barber with a clear vision: to create a
              grooming experience that rejects the rushed pace of modern shops. Committed to the
              highest standards of the craft, he established a sanctuary where every cut is a
              precise collaboration and every service is given the time it deserves.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 font-normal">
              Under Jose's leadership, Bro 502 Barber has expanded to two Seattle locations—Rainier
              and Georgetown. Today, the team comprises dedicated specialists selected not only for
              their exceptional technique, but also for their commitment to hospitality and patient
              craftsmanship.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-texture-marble border-y border-border/80 py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading
            eyebrow="Philosophy"
            title="Three rules we don't bend"
            intro="They're the reason guests come back for a decade at a time."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal
                as="li"
                key={v.title}
                variant="scale-up"
                delay={i * 0.12}
                className="lux-card lux-card-hover p-8 rounded-sm gold-glow-hover"
              >
                <span className="font-serif text-4xl text-forest font-semibold">0{i + 1}</span>
                <h3 className="mt-4 font-serif text-2xl text-foreground font-normal">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Inside the Shop */}
      <section className="py-24 md:py-32 overflow-hidden bg-texture-grain">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeading eyebrow="Inside the shop" title="Marble, linen and brass" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ImageMaskReveal
              src={gallery6}
              alt="Gold-framed mirror above a marble barber station at Bro502"
              width={1200}
              height={900}
              delay={0.1}
              className="shadow-[var(--shadow-soft)] rounded-sm border border-border/70"
              imgClassName="h-[420px]"
            />
            <ImageMaskReveal
              src={interior2}
              alt="Gold barber scissors, straight razor and badger brush on cream marble"
              width={1200}
              height={1200}
              delay={0.25}
              className="shadow-[var(--shadow-soft)] rounded-sm border border-border/70"
              imgClassName="h-[420px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
