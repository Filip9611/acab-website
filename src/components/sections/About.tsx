"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

const STATS = [
  { value: "5.0", label: "Google Rating", sub: "1 Rezension" },
  { value: "6102", label: "Malters LU", sub: "Eistrasse 3" },
  { value: "06", label: "Leistungen", sub: "aus einer Hand" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(rightRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(statsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-x-clip bg-black px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: Text */}
          <div ref={leftRef} className="md:col-span-7">
            <h2 className="font-serif text-5xl font-black uppercase leading-[1] tracking-tight text-white md:text-7xl lg:text-8xl">
              Ihre Werkstatt
              <br />
              <span className="text-white/30">in Malters.</span>
            </h2>

            <div className="mt-10 max-w-xl space-y-6">
              <p className="font-sans text-base leading-relaxed text-white/70 md:text-lg">
                <span className="font-serif text-white">ACAB</span> steht für{" "}
                <span className="text-white">All Cars All Bikes</span>.
                Fachgerechte Arbeit an Autos und Motorrädern. Mechanik,
                Carrosserie, Spenglerarbeiten und Lackierung aus einer Hand.
              </p>
              <p className="font-sans text-base leading-relaxed text-white/70 md:text-lg">
                Qualität, Sicherheit und Zuverlässigkeit. Von der ersten
                Diagnose bis zur fertigen Reparatur nehmen wir uns Zeit für Ihr
                Fahrzeug.
              </p>
            </div>

            {/* Inhaber signature */}
            <div className="mt-12 flex items-center gap-4">
              <div className="h-12 w-px bg-white/30" />
              <div>
                <div className="font-serif text-lg text-white">
                  Ardian Desku
                </div>
                <div className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Inhaber · Gründer
                </div>
              </div>
            </div>
          </div>

          {/* Right: Photo placeholder */}
          <div
            ref={rightRef}
            className="relative md:col-span-5"
          >
            <figure className="group relative aspect-[4/5] overflow-hidden border border-white/10 bg-white/[0.02]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/25">
                  Foto · Werkstatt
                </span>
              </div>

              {/* Corner accents */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 h-8 w-8 border-l border-t border-white/30"
              />
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 h-8 w-8 border-r border-t border-white/30"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-white/30"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-white/30"
              />

              {/* Watermark number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 -bottom-8 select-none font-serif text-[10rem] font-black leading-none text-white/[0.05]"
              >
                02
              </span>
            </figure>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-1 gap-px border-y border-white/10 bg-white/10 sm:grid-cols-3"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-black px-8 py-10">
              <div className="font-serif text-5xl font-black leading-none tracking-tight text-white md:text-6xl">
                {stat.value}
              </div>
              <div className="mt-4 font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                {stat.label}
              </div>
              <div className="mt-1 font-sans text-xs text-white/40">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
