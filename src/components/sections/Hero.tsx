"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

const SERVICES = [
  "Mechanik",
  "Spenglerei & Lack",
  "Aufbereitung",
  "KFZ-Service",
  "MFK-Vorbereitung",
  "Autohandel",
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const logoBlockRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    // Header-Elemente ausserhalb des Hero-DOM via Selector auflösen.
    const headerLogo = document.querySelector<HTMLElement>("#header-logo");
    const headerBg = document.querySelector<HTMLElement>("#header-bg");

    const ctx = gsap.context(() => {
      // Eine Timeline, ein ScrollTrigger. Range: volle Hero-Höhe.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero-Inhalte: Logo-Block + Services + Chevron faden aus (1 → 0)
      // in den ersten 70% des Scroll-Bereichs (duration 0.7 auf Timeline).
      tl.to(
        [
          logoBlockRef.current,
          servicesRef.current,
          chevronRef.current,
        ],
        { opacity: 0, ease: "none", duration: 0.7 },
        0,
      );

      // Header: ACAB-Logo + Background faden ein (0 → 1) in den letzten 30%
      // (Position 0.7, duration 0.3 → bis 100%).
      if (headerLogo && headerBg) {
        tl.to(
          [headerLogo, headerBg],
          { opacity: 1, ease: "none", duration: 0.3 },
          0.7,
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Layer 1: Gradient-Shimmer-Fallback — sichtbar wenn das Video fehlt. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-shimmer"
        style={{
          backgroundImage:
            "linear-gradient(115deg, #1a1a1a 0%, #3a3a3a 20%, #c8c8c8 45%, #f5f5f5 50%, #c8c8c8 55%, #3a3a3a 80%, #1a1a1a 100%)",
          backgroundSize: "250% 250%",
        }}
      />

      {/* Layer 2: Video — auf allen Breakpoints als Hintergrund. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_85%] brightness-[1.3] contrast-[1.2]"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 3: Auf Desktop Multiply-Knockout (Video sichtbar durch Text).
          Auf Mobile: halbtransparenter Schwarz-Overlay — Video bleibt sichtbar,
          weisser Text bleibt lesbar. */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 px-6 md:bg-black md:mix-blend-multiply">
        <div
          ref={logoBlockRef}
          className="flex flex-col items-center gap-3"
          style={{
            paddingBottom:
              "calc(clamp(6rem, 15vw, 16rem) - clamp(2.5rem, 8vw, 8rem))",
          }}
        >
          <h1
            className="whitespace-nowrap font-serif font-black uppercase leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(6rem, 15vw, 16rem)" }}
          >
            <span className="sr-only">Autowerkstatt in Malters – </span>
            ACAB
          </h1>

          <div className="flex items-center gap-3 md:gap-8">
            <div className="h-px w-8 bg-white md:w-32" />
            <span
              className="whitespace-nowrap font-sans font-black leading-none text-white"
              style={{
                fontSize: "clamp(1.25rem, 8vw, 8rem)",
                letterSpacing: "0.02em",
              }}
            >
              All Car&apos;s All Bike&apos;s
            </span>
            <div className="h-px w-8 bg-white md:w-32" />
          </div>
        </div>
      </div>

      {/* Services: Mobile = endlose Marquee-Laufschrift, Desktop = statische Zeile. */}
      <div
        ref={servicesRef}
        className="pointer-events-none absolute inset-x-0"
        style={{ bottom: "80px" }}
      >
        {/* Mobile: horizontal scrollende Laufschrift (rechts → links) */}
        <div className="overflow-hidden md:hidden">
          <div
            className="flex w-max animate-marquee items-center uppercase text-white/70"
            style={{
              fontSize: "clamp(0.7rem, 2.2vw, 0.85rem)",
              letterSpacing: "0.2em",
            }}
          >
            {/* Doppelte Kopie für nahtlosen Loop (translate -50% = ein Set) */}
            {[...SERVICES, ...SERVICES].map((service, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center whitespace-nowrap"
              >
                <span>{service}</span>
                <span
                  aria-hidden="true"
                  className="mx-6 text-white/30"
                >
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Desktop: statische, zentrierte Zeile mit Trennpunkten */}
        <ul
          className="mx-auto hidden max-w-[90vw] flex-nowrap items-center justify-center whitespace-nowrap px-4 uppercase text-white/70 md:flex"
          style={{
            fontSize: "clamp(0.55rem, 1.2vw, 0.85rem)",
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
      </div>

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
