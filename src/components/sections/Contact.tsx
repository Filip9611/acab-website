"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="bg-black px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
          Kontakt
        </h2>

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Kontaktinfo */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-5">
              <MapPin
                className="h-6 w-6 shrink-0 text-white"
                strokeWidth={1.25}
              />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                  Adresse
                </div>
                <p className="mt-1 text-white">
                  Eistrasse 3<br />
                  6102 Malters
                </p>
              </div>
            </div>

            <div className="flex gap-5">
              <Phone
                className="h-6 w-6 shrink-0 text-white"
                strokeWidth={1.25}
              />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                  Telefon
                </div>
                <a
                  href="tel:+41798691304"
                  className="mt-1 block text-white transition-colors hover:text-white/60"
                >
                  +41 79 869 13 04
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <Mail
                className="h-6 w-6 shrink-0 text-white"
                strokeWidth={1.25}
              />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                  E-Mail
                </div>
                <a
                  href="mailto:acab.garage@hotmail.com"
                  className="mt-1 block text-white transition-colors hover:text-white/60"
                >
                  acab.garage@hotmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-5">
              <Clock
                className="h-6 w-6 shrink-0 text-white"
                strokeWidth={1.25}
              />
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                  Öffnungszeiten
                </div>
                <div className="mt-1 grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-white">
                  <span className="text-white/60">Mo – Fr</span>
                  <span>09:00 – 18:30</span>
                  <span className="text-white/60">Sa + So</span>
                  <span className="text-white/40">Geschlossen</span>
                </div>
              </div>
            </div>
          </div>

          {/* Kontaktformular */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-6"
          >
            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                Name
              </span>
              <input
                type="text"
                name="name"
                required
                className="border-b border-white/30 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                Telefon
              </span>
              <input
                type="tel"
                name="phone"
                required
                className="border-b border-white/30 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs uppercase tracking-[0.25em] text-white/50">
                Nachricht
              </span>
              <textarea
                name="message"
                rows={5}
                required
                className="resize-none border-b border-white/30 bg-transparent py-2 text-white outline-none transition-colors focus:border-white"
              />
            </label>

            <button
              type="submit"
              className="mt-4 self-start border border-white px-10 py-4 text-xs uppercase tracking-[0.3em] text-white transition-colors hover:bg-white hover:text-black"
            >
              Nachricht senden
            </button>
          </form>
        </div>

        {/* Google Maps */}
        <div className="mt-16 aspect-[21/9] w-full overflow-hidden border border-white/10 grayscale contrast-125">
          <iframe
            src="https://maps.google.com/maps?q=Eistrasse%203%2C%206102%20Malters&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
