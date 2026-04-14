"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

const SERVICES = [
  "Mechanik",
  "Carrosserie",
  "Lackierarbeiten",
  "Aufbereitung",
  "KFZ-Service",
  "MFK-Vorbereitung",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const logoBlockRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // Hero-Inhalte (Logo-Block, Services, Chevron) faden aus.
      tl.to(
        [logoBlockRef.current, servicesRef.current, chevronRef.current],
        { opacity: 0, ease: "none" },
        0,
      );

      // Header-ACAB + Header-Hintergrund faden ein (Crossfade).
      tl.to(
        ["#header-logo", "#header-bg"],
        { opacity: 1, ease: "none" },
        0,
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-black"
    >
      {/* Logo-Block: ACAB + Subtitle in einer flex-col.
          padding-bottom = (H_acab - H_subtitle) verschiebt den Block so,
          dass die MITTE des Gaps zwischen den Zeilen auf 50vh liegt.
          Normale Flow-Position, kein fixed, kein transform. */}
      <div
        ref={logoBlockRef}
        className="acab-hero-title flex flex-col items-center gap-3 px-6"
        style={{
          paddingBottom:
            "calc(clamp(6rem, 15vw, 16rem) - clamp(2.5rem, 8vw, 8rem))",
        }}
      >
        <h1
          className="whitespace-nowrap font-serif font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(6rem, 15vw, 16rem)" }}
        >
          ACAB
        </h1>

        <div className="flex items-center gap-5 md:gap-8">
          <div className="h-px w-20 bg-white/50 md:w-32" />
          <span
            className="whitespace-nowrap font-sans font-black leading-none"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 8rem)",
              letterSpacing: "0.02em",
            }}
          >
            All Car&apos;s All Bike&apos;s
          </span>
          <div className="h-px w-20 bg-white/50 md:w-32" />
        </div>
      </div>

      {/* Services: einzeilig, am unteren Rand. */}
      <ul
        ref={servicesRef}
        className="absolute left-1/2 flex -translate-x-1/2 flex-nowrap items-center whitespace-nowrap px-4 uppercase text-white/70"
        style={{
          bottom: "80px",
          fontSize: "clamp(0.6rem, 1.2vw, 0.85rem)",
          letterSpacing: "0.15em",
        }}
      >
        {SERVICES.map((service, i) => (
          <li key={service} className="flex items-center">
            <span>{service}</span>
            {i < SERVICES.length - 1 && (
              <span aria-hidden="true" className="mx-3 text-white/30">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>

      {/* Chevron: direkt darunter. */}
      <div
        className="pointer-events-none absolute inset-x-0 flex justify-center"
        style={{ bottom: "40px" }}
      >
        <svg
          ref={chevronRef}
          className="h-6 w-6 animate-chevron text-white/80 md:h-7 md:w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
