"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations";

const ITEMS = [
  { label: "Werkstatt", aspect: "aspect-[4/5]" },
  { label: "Detail · Motor", aspect: "aspect-[4/3]" },
  { label: "Lackierung", aspect: "aspect-[4/3]" },
  { label: "Motorrad", aspect: "aspect-[4/5]" },
  { label: "Carrosserie", aspect: "aspect-[4/3]" },
  { label: "Fuhrpark", aspect: "aspect-[4/5]" },
];

export default function Gallery() {
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

      // Stagger fade-in for gallery items
      gsap.from(gridRef.current?.querySelectorAll("figure") || [], {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Parallax on each image layer
      gridRef.current
        ?.querySelectorAll<HTMLElement>("[data-parallax]")
        .forEach((el, i) => {
          const depth = i % 2 === 0 ? -60 : -30;
          gsap.to(el, {
            yPercent: depth,
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("figure"),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-x-clip bg-[#0A0A0A] px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div ref={headerRef} className="mb-20 md:mb-28">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <h2 className="font-serif text-5xl font-black uppercase leading-[1] tracking-tight text-white md:text-7xl lg:text-8xl">
              Einblicke
            </h2>
            <p className="max-w-md font-sans text-sm leading-relaxed text-white/50 md:text-base">
              Ein Blick hinter die Kulissen — vom laufenden Projekt bis zum
              fertigen Resultat.
            </p>
          </div>
        </div>

        {/* Asymmetric gallery grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4"
        >
          {ITEMS.map((item, i) => (
            <figure
              key={i}
              className={`group relative ${item.aspect} overflow-hidden border border-white/10 bg-white/[0.03]`}
            >
              {/* Parallax layer (placeholder) */}
              <div
                data-parallax
                className="absolute inset-0 -top-[10%] h-[120%] bg-gradient-to-br from-white/[0.02] via-white/[0.04] to-white/[0.01] transition-transform duration-700 group-hover:scale-105"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-serif text-5xl font-black text-white/[0.08] md:text-7xl">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-3 font-sans text-[10px] uppercase tracking-[0.4em] text-white/30">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-transform duration-500 group-hover:translate-y-0">
                <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/70">
                  {String(i + 1).padStart(2, "0")} · {item.label}
                </div>
                <div className="mt-2 h-px w-8 bg-white/60" />
              </div>

              {/* Corner accent on hover */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 z-10 h-6 w-6 border-l border-t border-white/0 transition-colors duration-500 group-hover:border-white/60"
              />
              <span
                aria-hidden="true"
                className="absolute right-0 top-0 z-10 h-6 w-6 border-r border-t border-white/0 transition-colors duration-500 group-hover:border-white/60"
              />
            </figure>
          ))}
        </div>

        {/* View more footer */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-white/10" />
          <a
            href="#contact"
            className="group flex items-center gap-3 font-sans text-[10px] uppercase tracking-[0.4em] text-white/60 transition-colors hover:text-[#B91C1C]"
          >
            Projekt anfragen
            <span className="block h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#B91C1C]" />
          </a>
          <div className="h-px flex-1 bg-white/10" />
        </div>
      </div>
    </section>
  );
}
