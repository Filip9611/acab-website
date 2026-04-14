"use client";

import { useEffect, useRef } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animations";

const INFO = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Eistrasse 3\n6102 Malters",
    href: "https://maps.google.com/maps?q=Eistrasse+3,+6102+Malters",
    external: true,
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+41 79 869 13 04",
    href: "tel:+41798691304",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: "acab.garage@hotmail.com",
    href: "mailto:acab.garage@hotmail.com",
  },
];

const HOURS: [string, string, boolean?][] = [
  ["Montag", "09:00 – 18:30"],
  ["Dienstag", "09:00 – 18:30"],
  ["Mittwoch", "09:00 – 18:30"],
  ["Donnerstag", "09:00 – 18:30"],
  ["Freitag", "09:00 – 18:30"],
  ["Samstag", "Geschlossen", true],
  ["Sonntag", "Geschlossen", true],
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

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

      gsap.from([leftRef.current, rightRef.current], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(mapRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-12 bg-white/40" />
            <span className="font-sans text-[11px] uppercase tracking-[0.4em] text-white/60">
              Kontakt · 04
            </span>
          </div>
          <h2 className="font-serif text-5xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
            Schreiben Sie
            <br />
            <span className="text-white/30">uns.</span>
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          {/* Left column: Info + Hours */}
          <div ref={leftRef} className="md:col-span-5">
            {/* Contact rows */}
            <div className="space-y-px bg-white/10">
              {INFO.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group relative flex items-start gap-6 bg-black px-6 py-6 transition-colors duration-300 hover:bg-[#0A0A0A]"
                >
                  <Icon
                    className="mt-1 h-5 w-5 shrink-0 text-white/80 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.25}
                  />
                  <div className="flex-1">
                    <div className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                      {label}
                    </div>
                    <div className="mt-1 whitespace-pre-line font-serif text-lg text-white">
                      {value}
                    </div>
                  </div>
                  <ArrowUpRight
                    className="h-5 w-5 text-white/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                </a>
              ))}
            </div>

            {/* Opening hours */}
            <div className="mt-12">
              <div className="mb-4 flex items-center gap-3">
                <Clock
                  className="h-4 w-4 text-white/60"
                  strokeWidth={1.5}
                />
                <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                  Öffnungszeiten
                </span>
              </div>
              <ul>
                {HOURS.map(([day, time, closed]) => (
                  <li
                    key={day}
                    className="flex items-baseline justify-between border-b border-white/5 py-3 font-sans text-sm last:border-b-0"
                  >
                    <span
                      className={closed ? "text-white/40" : "text-white/90"}
                    >
                      {day}
                    </span>
                    <span className="flex-1 mx-4 border-b border-dashed border-white/10" />
                    <span
                      className={
                        closed
                          ? "text-white/30"
                          : "font-mono text-white tabular-nums"
                      }
                    >
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Form */}
          <div ref={rightRef} className="md:col-span-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <FormField label="Name" name="name" type="text" />
                <FormField label="Telefon" name="phone" type="tel" />
              </div>
              <FormField label="E-Mail" name="email" type="email" />
              <FormField label="Fahrzeug / Kennzeichen" name="vehicle" type="text" />
              <FormField
                label="Ihre Nachricht"
                name="message"
                type="textarea"
                rows={6}
              />

              <div className="flex items-center justify-between gap-4 pt-4">
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Wir melden uns innert 24h
                </p>
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-4 border border-white px-8 py-4 font-sans text-[11px] uppercase tracking-[0.35em] text-white transition-all duration-300 hover:bg-white hover:text-black md:px-10 md:py-5"
                >
                  <span>Senden</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          className="mt-24 grid grid-cols-12 gap-6 md:mt-32"
        >
          <div className="col-span-12 flex items-center gap-4 lg:col-span-3 lg:flex-col lg:items-start lg:justify-center">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/50">
              Standort
            </span>
            <div className="hidden h-px flex-1 bg-white/10 lg:block lg:w-full lg:flex-none" />
            <div>
              <div className="font-serif text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                Malters
              </div>
              <div className="mt-2 font-sans text-xs text-white/50">
                Kanton Luzern · Schweiz
              </div>
            </div>
          </div>
          <div className="col-span-12 aspect-[16/9] overflow-hidden border border-white/10 grayscale contrast-125 invert-[0.02] lg:col-span-9">
            <iframe
              src="https://maps.google.com/maps?q=Eistrasse%203%2C%206102%20Malters&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort ACAB Garage, Eistrasse 3, 6102 Malters"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  type: "text" | "email" | "tel" | "textarea";
  rows?: number;
};

function FormField({ label, name, type, rows }: FormFieldProps) {
  const commonClass =
    "peer w-full border-0 border-b border-white/20 bg-transparent py-3 font-sans text-base text-white outline-none transition-colors duration-300 placeholder:text-transparent focus:border-white";

  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-0 top-3 origin-left font-sans text-sm uppercase tracking-[0.2em] text-white/40 transition-all duration-300 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-white/70 peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-white/70">
        {label}
      </span>
      {type === "textarea" ? (
        <textarea
          name={name}
          rows={rows ?? 4}
          required
          placeholder=" "
          className={`${commonClass} resize-none`}
        />
      ) : (
        <input
          name={name}
          type={type}
          required
          placeholder=" "
          className={commonClass}
        />
      )}
    </label>
  );
}
