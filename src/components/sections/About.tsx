export default function About() {
  return (
    <section id="about" className="bg-black px-6 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h2 className="mb-8 font-serif text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
            Ihre Werkstatt
            <br />
            in Malters
          </h2>
          <p className="text-base leading-relaxed text-white/70 md:text-lg">
            ACAB steht für{" "}
            <span className="font-semibold text-white">
              All Cars All Bikes
            </span>
            . Fachgerechte Arbeit an Autos und Motorrädern. Mechanik,
            Carrosserie, Spenglerarbeiten und Lackierung — alles aus einer Hand.
          </p>
          <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
            Qualität, Sicherheit und Zuverlässigkeit. Von der ersten Diagnose
            bis zur fertigen Reparatur nehmen wir uns Zeit für Ihr Fahrzeug —
            und für Sie.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px bg-white/10 sm:max-w-md">
            <div className="bg-black p-5">
              <div className="font-serif text-4xl font-black text-white">
                5.0
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
                Google Rating
              </div>
            </div>
            <div className="bg-black p-5">
              <div className="font-serif text-4xl font-black text-white">
                LU
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.25em] text-white/50">
                6102 Malters
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs uppercase tracking-[0.4em] text-white/25">
              Foto Werkstatt
            </span>
          </div>
          <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
          <div className="absolute right-0 top-0 h-full w-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
