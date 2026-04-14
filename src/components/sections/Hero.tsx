"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

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
      gsap.to([logoBlockRef.current, servicesRef.current], {
        opacity: 0,
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: () => window.innerHeight * 0.6,
          scrub: true,
        },
      });

      gsap.to(chevronRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: 0,
          end: () => window.innerHeight * 0.2,
          scrub: true,
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
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

      {/* Layer 2: Video — überdeckt den Gradient wenn geladen. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Layer 3: Multiply-Knockout — schwarzer Overlay mit weisser Schrift.
          Schwarz × Video = Schwarz (Video unsichtbar), Weiss × Video = Video
          (sichtbar nur durch die Buchstaben). */}
      <div className="absolute inset-0 flex items-center justify-center bg-black px-6 mix-blend-multiply">
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
            ACAB
          </h1>

          <div className="flex items-center gap-5 md:gap-8">
            <div className="h-px w-20 bg-white md:w-32" />
            <span
              className="whitespace-nowrap font-sans font-black leading-none text-white"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 8rem)",
                letterSpacing: "0.02em",
              }}
            >
              All Car&apos;s All Bike&apos;s
            </span>
            <div className="h-px w-20 bg-white md:w-32" />
          </div>
        </div>
      </div>

      {/* Services: einzeilig, am unteren Rand. Ausserhalb des Multiply-Blends. */}
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
