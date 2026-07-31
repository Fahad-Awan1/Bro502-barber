import { Reveal } from "@/components/Reveal";
import { Scissors } from "lucide-react";

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden bg-texture-marble border-b border-border/80 pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Soft Ambient Gold/Forest Glows */}
      <div
        className="pointer-events-none absolute -top-16 right-10 size-80 rounded-full bg-gold/12 blur-3xl animate-float-slow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-10 size-72 rounded-full bg-forest/8 blur-3xl animate-float-slow [animation-delay:3s]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl font-normal">
            {title}
          </h1>

          {/* Decorative Scissor Divider */}
          <div className="mt-7 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-0.5 w-14 rounded-full bg-gradient-to-r from-gold/20 via-gold to-gold" />
            <Scissors className="size-4 shrink-0 text-gold" />
            <span className="h-0.5 w-14 rounded-full bg-gradient-to-r from-gold via-gold to-gold/20" />
          </div>

          {intro ? (
            <p className="mt-7 text-base leading-relaxed text-muted-foreground font-normal max-w-2xl mx-auto">
              {intro}
            </p>
          ) : null}
        </Reveal>
      </div>
    </header>
  );
}
