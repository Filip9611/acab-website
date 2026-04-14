import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Über uns", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
];

const SERVICES = [
  "Mechanik",
  "Carrosserie",
  "Lackierarbeiten",
  "Aufbereitung",
  "KFZ-Service",
  "MFK-Vorbereitung",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-x-clip border-t border-white/10 bg-black">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 pb-16 pt-24 md:pb-20 md:pt-32">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-serif text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
              ACAB
            </div>
            <div className="mt-2 font-sans text-[10px] uppercase tracking-[0.4em] text-white/50">
              All Cars · All Bikes
            </div>
            <p className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-white/50">
              Ihre Autowerkstatt in Malters. Fachgerechte Arbeit an Autos und
              Motorrädern. Alles aus einer Hand.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px w-6 bg-white/40" />
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/50">
                Malters · Kanton Luzern
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2">
            <div className="mb-5 font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
              Seiten
            </div>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="group flex items-center gap-2 font-sans text-sm text-white/70 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-3" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <div className="mb-5 font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
              Leistungen
            </div>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li
                  key={service}
                  className="font-sans text-sm text-white/70"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="mb-5 font-sans text-[10px] uppercase tracking-[0.35em] text-white/40">
              Kontakt
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 font-sans text-sm text-white/70">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-white/60"
                  strokeWidth={1.5}
                />
                <span>
                  Eistrasse 3<br />
                  6102 Malters
                </span>
              </li>
              <li>
                <a
                  href="tel:+41798691304"
                  className="group flex items-center gap-3 font-sans text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-white/60 transition-colors group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <span>+41 79 869 13 04</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:acab.garage@hotmail.com"
                  className="group flex items-center gap-3 font-sans text-sm text-white/70 transition-colors hover:text-white"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-white/60 transition-colors group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <span className="truncate">acab.garage@hotmail.com</span>
                </a>
              </li>
            </ul>

            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 border border-[#B91C1C] bg-[#B91C1C] px-5 py-3 font-sans text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-300 hover:border-[#a01919] hover:bg-[#a01919]"
            >
              Anfrage stellen
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 font-sans text-[10px] uppercase tracking-[0.3em] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {year} ACAB All Cars All Bikes GmbH · Alle Rechte vorbehalten
          </div>
          <div className="flex items-center gap-4">
            <span>Malters · Schweiz</span>
            <span className="h-3 w-px bg-white/20" />
            <a
              href="#hero"
              className="transition-colors hover:text-white"
            >
              Nach oben ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
