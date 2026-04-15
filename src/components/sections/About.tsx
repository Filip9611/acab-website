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
      className="relative overflow-x-clip bg-black px-6 py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: Text */}
          <div ref={leftRef} className="md:col-span-7">
            <h2
              className="font-serif font-black uppercase leading-[1] tracking-tight text-white"
              style={{ fontSize: "clamp(3rem, 5.5vw, 6rem)" }}
            >
              Ihre Werkstatt
              <br />
              <span className="text-white/30">in Malters.</span>
            </h2>

            <div className="mt-10 max-w-xl space-y-6">
              <p className="font-sans text-base leading-relaxed text-white/70 md:text-lg">
                <span className="font-serif text-white">ACAB</span> steht für{" "}
                <span className="text-white">All Car&apos;s All Bike&apos;s</span>.
                Fachgerechte Arbeit an Autos und Motorrädern. Mechanik,
                Spenglerei &amp; Lack, Aufbereitung, KFZ-Service,
                MFK-Vorbereitung und Autohandel. Alles aus einer Hand.
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
              <img
                src="/images/werkstatt.webp"
                alt="Innenansicht der ACAB Werkstatt in Malters"
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />

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
          className="mt-12 grid grid-cols-3 gap-px border-y border-white/10 bg-white/10 md:mt-16"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-black px-3 py-5 md:px-8 md:py-10"
            >
              <div
                className="font-serif font-black leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(1.5rem, 4vw, 3.75rem)" }}
              >
                {stat.value}
              </div>
              <div className="mt-2 font-sans text-[9px] uppercase tracking-[0.25em] text-white/50 md:mt-4 md:text-[10px] md:tracking-[0.35em]">
                {stat.label}
              </div>
              <div className="mt-0.5 truncate font-sans text-[10px] text-white/40 md:mt-1 md:text-xs">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
