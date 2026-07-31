import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";
import { BUSINESS, HOURS } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="border-t border-border surface-linen">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-serif text-3xl">
            Bro<span className="text-gold">502</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            A premium grooming lounge on Kona Street — precision cuts, hot towel rituals and an
            unhurried chair.
          </p>
          <div className="mt-6 flex gap-3">
            {BUSINESS.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-sm border border-border px-3 py-1.5 text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase transition-colors duration-300 hover:border-gold hover:text-gold"
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
                <Link to={l.to} className="transition-colors duration-300 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Visit</h3>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              <span>
                {BUSINESS.street}
                <br />
                {BUSINESS.city}
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={BUSINESS.phoneHref} className="hover:text-gold">
                {BUSINESS.phone}
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-gold">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow">Hours</h3>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-foreground/80">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Bro502 Barbershop. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Honolulu · Hawai'i</p>
        </div>
      </div>
    </footer>
  );
}