import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useBooking } from "@/components/booking/BookingContext";
import { GoldButton } from "@/components/ui/GoldButton";
import heroVideo from "@/assets/hero-haircut.mp4.asset.json";

/**
 * HERO VIDEO CONFIG
 * Drop in your own clip by replacing the asset above, or point HERO_VIDEO_SRC
 * at a file you place in /public (e.g. "/hero-haircut.mp4").
 */
export const HERO_VIDEO_SRC = heroVideo.url;
/** How much scroll distance the scrub sequence occupies (multiples of viewport height). */
const SCRUB_VH = 3;

export function ScrollVideoHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const reduceMotion = useReducedMotion();
  const [canScrub, setCanScrub] = useState(false);
  const [ready, setReady] = useState(false);

  const { openBooking } = useBooking();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [0.34, 0.5, 0.68]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.28, 0.75, 1], [1, 1, 0.25, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  // Decide whether scroll-scrubbing is viable on this device.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 4 || window.innerWidth < 768;
    setCanScrub(!reduceMotion && !coarse && !lowPower);
  }, [reduceMotion]);

  // rAF loop: eases video.currentTime toward the scroll-derived target.
  useEffect(() => {
    if (!canScrub) return;
    const video = videoRef.current;
    if (!video) return;

    const unsubscribe = scrollYProgress.on("change", (p) => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      targetTimeRef.current = Math.min(Math.max(p, 0), 0.999) * duration;
    });

    const tick = () => {
      const v = videoRef.current;
      if (v && v.readyState >= 2) {
        const current = v.currentTime;
        const delta = targetTimeRef.current - current;
        if (Math.abs(delta) > 0.012) {
          v.currentTime = current + delta * 0.18;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      unsubscribe();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [canScrub, scrollYProgress]);

  // Fallback playback: play through once, muted.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || canScrub) return;
    if (reduceMotion) return;
    video.play().catch(() => {
      /* autoplay blocked — static frame is an acceptable fallback */
    });
  }, [canScrub, reduceMotion]);

  return (
    <section
      ref={wrapperRef}
      aria-label="Bro502 barbershop introduction"
      style={{ height: canScrub ? `${SCRUB_VH * 100}vh` : "100svh" }}
      className="relative"
    >
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          src={HERO_VIDEO_SRC}
          className="absolute inset-0 size-full object-cover"
          muted
          playsInline
          preload="auto"
          autoPlay={false}
          loop={false}
          disablePictureInPicture
          onLoadedData={() => setReady(true)}
          aria-hidden="true"
        />
        <motion.div
          className="absolute inset-0 bg-espresso"
          style={{ opacity: canScrub ? overlayOpacity : 0.45 }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-background/35 via-transparent to-background"
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity: canScrub ? contentOpacity : 1, y: canScrub ? contentY : 0 }}
          className="relative z-10 mx-auto max-w-3xl px-6 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
            transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-[0.7rem] tracking-[0.42em] text-gold-soft uppercase"
          >
            Honolulu · Est. 2014
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-6 font-serif text-4xl leading-[1.08] text-background sm:text-6xl md:text-7xl"
          >
            The Art of the
            <span className="block italic text-gold-soft">Modern Gentleman</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-background/85 sm:text-base"
          >
            Precision cuts, hot towel rituals and an unhurried chair on Kona Street.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
            className="mt-10 flex justify-center"
          >
            <GoldButton size="lg" onClick={() => openBooking()}>
              Book Appointment
            </GoldButton>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-background/70">
          <ChevronDown className="size-6 animate-bounce" aria-hidden="true" />
          <span className="sr-only">Scroll to continue</span>
        </div>
      </div>
    </section>
  );
}