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
  const blockRef = useRef<HTMLDivElement>(null);
  const subtitleRowRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLUListElement>(null);
  const chevronRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      // Block morpht: von viewport-mittig (CSS) zu oben-links + scale 0.15.
      // CSS hat translateX(-50%); GSAP liest xPercent:-50 und tweenen auf 0.
      // transform-origin bleibt "0 0" (CSS), damit scale vom Block-Top-Left shrinkt.
      // webkitTextFillColor: transparent → white macht Shimmer solid weiss am Ende.
      gsap.to(blockRef.current, {
        top: "1rem",
        left: "1.5rem",
        xPercent: 0,
        scale: 0.15,
        webkitTextFillColor: "#ffffff",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Subtitle, Services, Chevron faden über die volle Scroll-Strecke.
      gsap.to(
        [subtitleRowRef.current, servicesRef.current, chevronRef.current],
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, heroRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Logo-Block: fixed. CSS handled Anfangszustand — GSAP fasst es
          erst beim Scrollen an.
          - top berechnet so, dass Block-Bottom bei (50% - 0.375rem) liegt
            → der 0.75rem Gap zu Subtitle zentriert sich exakt auf 50vh.
          - Subtitle ist absolute (out-of-flow) → Block-Breite = ACAB-Breite,
            damit GSAP-scale das Logo sauber in Top-Left shrinken kann. */}
      <div
        ref={blockRef}
        className="acab-hero-title pointer-events-none fixed z-40"
        style={{
          top: "calc(50% - 0.375rem - clamp(6rem, 15vw, 16rem))",
          left: "50%",
          transform: "translateX(-50%)",
          transformOrigin: "0 0",
        }}
      >
        <h1
          className="whitespace-nowrap font-serif font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(6rem, 15vw, 16rem)" }}
        >
          ACAB
        </h1>

        <div
          ref={subtitleRowRef}
          className="absolute left-1/2 top-full mt-3 flex -translate-x-1/2 items-center gap-5 md:gap-8"
        >
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
