import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS, LOCATIONS } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border surface-linen">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-3xl">
            Bro<span className="text-red-500 font-bold">502</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A premium grooming lounge in Seattle — precision cuts, hot towel rituals and an
            unhurried chair.
          </p>

          <ul className="mt-6 space-y-2.5 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <Phone className="size-4 shrink-0 text-foreground/70" aria-hidden="true" />
              <a href={BUSINESS.phoneHref} className="hover:text-foreground transition-colors">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="size-4 shrink-0 text-foreground/70" aria-hidden="true" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-foreground transition-colors">
                {BUSINESS.email}
              </a>
            </li>
          </ul>

          <div className="mt-6 flex gap-3">
            {BUSINESS.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-sm border border-border px-3 py-1.5 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase transition-colors duration-300 hover:border-foreground/60 hover:text-foreground"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            {[
              { to: "/about", label: "About Us" },
              { to: "/services", label: "Services" },
              { to: "/barbers", label: "Our Barbers" },
              { to: "/gallery", label: "Gallery" },
              { to: "/contact", label: "Contact & Booking" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors duration-300 hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{LOCATIONS[0].name}</h3>
          <ul className="mt-5 space-y-4 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-foreground/70" aria-hidden="true" />
              <a
                href={LOCATIONS[0].mapLink}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-foreground leading-relaxed transition-colors"
              >
                {LOCATIONS[0].address}
              </a>
            </li>
            <li>
              <p className="text-[0.6rem] tracking-[0.2em] text-foreground/80 uppercase font-medium">
                Hours:
              </p>
              <ul className="mt-2 space-y-1.5">
                {LOCATIONS[0].hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-foreground/80">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">{LOCATIONS[1].name}</h3>
          <ul className="mt-5 space-y-4 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="size-4 shrink-0 text-foreground/70" aria-hidden="true" />
              <a
                href={LOCATIONS[1].mapLink}
                target="_blank"
                rel="noreferrer noopener"
                className="hover:text-foreground leading-relaxed transition-colors"
              >
                {LOCATIONS[1].address}
              </a>
            </li>
            <li>
              <p className="text-[0.6rem] tracking-[0.2em] text-foreground/80 uppercase font-medium">
                Hours:
              </p>
              <ul className="mt-2 space-y-1.5">
                {LOCATIONS[1].hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{h.day}</span>
                    <span className="text-foreground/80">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Bro 502 Barber. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Seattle · Washington</p>
        </div>
      </div>
    </footer>
  );
}
