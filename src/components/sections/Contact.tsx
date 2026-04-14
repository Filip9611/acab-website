"use client";

import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/animations";

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

type InfoItem = {
  icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  accentColor?: string;
};

const INFO: InfoItem[] = [
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
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "+41 79 869 13 04",
    href: "https://wa.me/41798691304",
    external: true,
    accentColor: "#25D366",
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
      className="relative overflow-x-clip bg-black px-6 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 md:mb-28">
          <h2 className="font-serif text-5xl font-black uppercase leading-[1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Schreiben Sie uns.
          </h2>
        </div>

        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          {/* Left column: Info + Hours */}
          <div ref={leftRef} className="md:col-span-5">
            {/* Contact rows */}
            <div className="space-y-px bg-white/10">
              {INFO.map(
                ({ icon: Icon, label, value, href, external, accentColor }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group relative flex items-start gap-6 bg-black px-6 py-6 transition-colors duration-300 hover:bg-[#0A0A0A]"
                  >
                    <Icon
                      className={`mt-1 h-5 w-5 shrink-0 transition-colors duration-300 ${
                        accentColor ? "" : "text-white/80 group-hover:text-white"
                      }`}
                      strokeWidth={1.25}
                      style={
                        accentColor
                          ? { color: accentColor }
                          : undefined
                      }
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
                ),
              )}
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
                  className="group relative inline-flex items-center gap-4 border border-[#B91C1C] bg-[#B91C1C] px-8 py-4 font-sans text-[11px] uppercase tracking-[0.35em] text-white transition-all duration-300 hover:border-[#a01919] hover:bg-[#a01919] md:px-10 md:py-5"
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
