"use client";

import { useEffect, useRef } from "react";
import {
  Wrench,
  Car,
  SprayCan,
  Sparkles,
  Cog,
  ClipboardCheck,
} from "lucide-react";
import { gsap } from "@/lib/animations";

const SERVICES = [
  {
    number: "01",
    icon: Wrench,
    title: "Mechanik",
    description:
      "Von der Inspektion bis zur Motorreparatur. Moderne Diagnosegeräte und Erfahrung bei allen Marken, für Autos wie Motorräder.",
  },
  {
    number: "02",
    icon: Car,
    title: "Carrosserie",
    description:
      "Spenglerarbeiten, Unfallreparaturen und Beulen. Fachgerecht instandgesetzt mit Originalteilen oder hochwertigen Alternativen.",
  },
  {
    number: "03",
    icon: SprayCan,
    title: "Lackierarbeiten",
    description:
      "Komplette Neulackierungen oder punktgenaue Ausbesserungen. Präzise Farbanpassung an den Originalton Ihres Fahrzeugs.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Aufbereitung",
    description:
      "Innenreinigung, Politur und Nanoversiegelung. Ihr Fahrzeug wie neu, innen wie aussen auf Hochglanz gebracht.",
  },
  {
    number: "05",
    icon: Cog,
    title: "KFZ-Service",
    description:
      "Regelmässige Wartung, Ölwechsel, Bremsen und Reifen. Alles was nötig ist, damit Sie sicher und zuverlässig unterwegs sind.",
  },
  {
    number: "06",
    icon: ClipboardCheck,
    title: "MFK-Vorbereitung",
    description:
      "Gründliche Vorkontrolle inklusive Behebung aller Mängel. Ihr Fahrzeug startet bestens vorbereitet in die Motorfahrzeugkontrolle.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(gridRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0A0A0A] px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <h2 className="font-serif text-5xl font-black uppercase leading-[1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Was wir
            <br />
            <span className="text-white/30">für Sie tun</span>
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-white/60 md:text-lg">
            Sechs Disziplinen, eine Werkstatt. Fachgerechte Arbeit an Autos und
            Motorrädern, von der kleinen Reparatur bis zur kompletten
            Neulackierung.
          </p>
        </div>

        {/* Service grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {SERVICES.map(({ number, icon: Icon, title, description }) => (
            <article
              key={number}
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden border border-white/10 bg-[#0A0A0A] p-10 transition-colors duration-500 hover:bg-[#141414] md:p-14"
            >
              {/* Watermark number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] font-black leading-none text-white/[0.04] transition-[color,transform] duration-500 group-hover:text-white/[0.08] md:text-[11rem]"
              >
                {number}
              </span>

              <div className="relative z-10">
                <Icon
                  className="h-10 w-10 text-white transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.25}
                />
              </div>

              <div className="relative z-10 mt-10">
                <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                  {title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
