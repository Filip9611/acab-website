import {
  Wrench,
  Car,
  SprayCan,
  Sparkles,
  Cog,
  ClipboardCheck,
} from "lucide-react";

const SERVICES = [
  {
    icon: Wrench,
    title: "Mechanik",
    description:
      "Von der Inspektion bis zur Motorreparatur. Moderne Diagnosegeräte und Erfahrung bei allen Marken — Auto wie Motorrad.",
  },
  {
    icon: Car,
    title: "Carrosserie",
    description:
      "Spenglerarbeiten, Unfallreparaturen und Beulen. Fachgerecht instandgesetzt mit Originalteilen oder hochwertigen Alternativen.",
  },
  {
    icon: SprayCan,
    title: "Lackierarbeiten",
    description:
      "Komplette Neulackierungen oder punktgenaue Ausbesserungen. Präzise Farbanpassung an den Originalton Ihres Fahrzeugs.",
  },
  {
    icon: Sparkles,
    title: "Aufbereitung",
    description:
      "Innenreinigung, Polieren und Nanoversiegelung. Ihr Fahrzeug wie neu — innen und aussen auf Hochglanz gebracht.",
  },
  {
    icon: Cog,
    title: "KFZ-Service",
    description:
      "Regelmässige Wartung, Ölwechsel, Bremsen, Reifen. Alles was nötig ist, damit Sie sicher und zuverlässig unterwegs sind.",
  },
  {
    icon: ClipboardCheck,
    title: "MFK-Vorbereitung",
    description:
      "Gründliche Vorkontrolle inkl. Behebung aller Mängel. Ihr Fahrzeug startet bestens vorbereitet in die Motorfahrzeugkontrolle.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0A0A0A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
          Unsere
          <br />
          Leistungen
        </h2>

        <div className="grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group flex flex-col gap-5 bg-[#0A0A0A] p-8 transition-colors duration-300 hover:bg-[#141414] md:p-10"
            >
              <Icon
                className="h-10 w-10 text-white transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.25}
              />
              <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-white/60 md:text-base">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
