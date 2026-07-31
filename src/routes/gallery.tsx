import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { GALLERY } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Cuts, Shaves & Styling at Bro502 Honolulu" },
      {
        name: "description",
        content:
          "Browse fades, beard sculpts, hot towel shaves and styling work from the chairs at Bro502 Barbershop in Honolulu.",
      },
      { property: "og:title", content: "Gallery | Bro502 Barbershop Honolulu" },
      {
        property: "og:description",
        content: "Fades, beard sculpts and hot towel shaves from the Bro502 chairs.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + GALLERY.length) % GALLERY.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="The gallery"
        intro="Work from our chairs — tap any image to view it full size."
      />

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal
                as="li"
                key={g.alt}
                delay={(i % 3) * 0.08}
                className={g.span === "tall" ? "sm:row-span-2" : ""}
              >
                <motion.button
                  type="button"
                  onClick={() => setIndex(i)}
                  whileHover={reduce ? undefined : { rotateX: -4, rotateY: 4, scale: 1.015 }}
                  transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                  style={{ transformPerspective: 900 }}
                  className="group relative block h-full w-full overflow-hidden shadow-[var(--shadow-soft)]"
                >
                  <img
                    src={g.src}
                    alt={g.alt}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.06] ${
                      g.span === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"
                    }`}
                  />
                  <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/20" />
                </motion.button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <AnimatePresence>
        {index !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed inset-0 z-[60] grid place-items-center bg-espresso/92 p-5"
            onClick={close}
          >
            <motion.img
              key={index}
              src={GALLERY[index].src}
              alt={GALLERY[index].alt}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
              className="max-h-[82svh] max-w-[92vw] object-contain shadow-[var(--shadow-lift)]"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 text-center text-xs text-background/80">
              {GALLERY[index].alt}
            </p>
            <button
              type="button"
              aria-label="Close"
              onClick={close}
              className="absolute top-5 right-5 rounded-full border border-background/30 p-2 text-background transition-colors hover:border-gold hover:text-gold"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full border border-background/30 p-2 text-background transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full border border-background/30 p-2 text-background transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="size-5" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}