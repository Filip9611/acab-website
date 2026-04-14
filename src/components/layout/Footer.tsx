import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-6 py-16">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:gap-12">
        <div>
          <div className="font-serif text-3xl font-black uppercase tracking-tight text-white">
            ACAB
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/40">
            All Cars · All Bikes
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
            Ihre Werkstatt in Malters. Mechanik, Carrosserie und Lackierung —
            für Autos und Motorräder.
          </p>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Kontakt
          </div>
          <ul className="flex flex-col gap-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 h-4 w-4 shrink-0"
                strokeWidth={1.5}
              />
              <span>Eistrasse 3, 6102 Malters</span>
            </li>
            <li>
              <a
                href="tel:+41798691304"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                +41 79 869 13 04
              </a>
            </li>
            <li>
              <a
                href="mailto:acab.garage@hotmail.com"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                acab.garage@hotmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.25em] text-white/50">
            Öffnungszeiten
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <dt className="text-white/60">Mo – Fr</dt>
            <dd className="text-white/90">09:00 – 18:30</dd>
            <dt className="text-white/60">Sa + So</dt>
            <dd className="text-white/40">Geschlossen</dd>
          </dl>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
        <div>
          © {new Date().getFullYear()} ACAB All Cars All Bikes GmbH. Alle Rechte
          vorbehalten.
        </div>
        <div>Malters · Schweiz</div>
      </div>
    </footer>
  );
}
