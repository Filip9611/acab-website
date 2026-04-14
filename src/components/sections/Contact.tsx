"use client";

import { useEffect, useRef, type ComponentType, type SVGProps } from "react";
import { Phone, Mail } from "lucide-react";
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

type ContactCard = {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
  external?: boolean;
  accentColor?: string;
};

const CARDS: ContactCard[] = [
  {
    label: "Anrufen",
    value: "+41 79 869 13 04",
    href: "tel:+41798691304",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "+41 79 869 13 04",
    href: "https://wa.me/41798691304",
    icon: WhatsAppIcon,
    external: true,
    accentColor: "#25D366",
  },
  {
    label: "E-Mail",
    value: "acab.garage@hotmail.com",
    href: "mailto:acab.garage@hotmail.com",
    icon: Mail,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
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

      gsap.from(cardsRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(metaRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: metaRef.current,
          start: "top 90%",
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
        {/* Headline */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <h2 className="font-serif text-5xl font-black uppercase leading-[1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Schreiben Sie
            <br />
            <span className="text-white/30">uns.</span>
          </h2>
        </div>

        {/* 3 contact cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
        >
          {CARDS.map(
            ({ label, value, href, icon: Icon, external, accentColor }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group relative flex min-h-[220px] flex-col justify-between border border-white/15 bg-black p-8 transition-colors duration-300 hover:border-[#B91C1C] md:p-10"
              >
                <Icon
                  className={`h-9 w-9 shrink-0 transition-colors duration-300 md:h-10 md:w-10 ${
                    accentColor ? "" : "text-white"
                  }`}
                  strokeWidth={1.25}
                  style={accentColor ? { color: accentColor } : undefined}
                />

                <div className="mt-10">
                  <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/50">
                    {label}
                  </div>
                  <div className="mt-3 break-all font-serif text-xl font-black text-white md:text-2xl">
                    {value}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-px w-8 bg-white/30 transition-all duration-300 group-hover:w-20 group-hover:bg-[#B91C1C]" />
                    <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/40 transition-colors duration-300 group-hover:text-[#B91C1C]">
                      {label === "Anrufen"
                        ? "Jetzt anrufen"
                        : label === "WhatsApp"
                          ? "Chat öffnen"
                          : "Nachricht senden"}
                    </span>
                  </div>
                </div>
              </a>
            ),
          )}
        </div>

        {/* Compact meta line */}
        <p
          ref={metaRef}
          className="mt-12 text-center font-sans text-xs uppercase tracking-[0.3em] text-white/50 md:mt-14 md:text-sm"
        >
          <a
            href="https://maps.google.com/maps?q=Eistrasse+3,+6102+Malters"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Eistrasse 3, 6102 Malters
          </a>
          <span className="mx-3 text-white/20">·</span>
          <span className="text-white/70">Mo-Fr 09:00-18:30</span>
          <span className="mx-3 text-white/20">·</span>
          <span>Sa &amp; So geschlossen</span>
        </p>

        {/* Map */}
        <div
          ref={mapRef}
          className="mt-16 aspect-[16/9] w-full overflow-hidden border border-white/10 md:mt-20"
        >
          <iframe
            src="https://maps.google.com/maps?q=Eistrasse%203%2C%206102%20Malters&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Standort ACAB Garage, Eistrasse 3, 6102 Malters"
          />
        </div>
      </div>
    </section>
  );
}
