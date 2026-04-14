export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#0A0A0A] px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 font-serif text-4xl font-black uppercase leading-none tracking-tight text-white md:text-6xl lg:text-7xl">
          Einblicke
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <figure
              key={i}
              className="group relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5 transition-colors duration-300 hover:bg-white/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-[0.4em] text-white/25">
                  Bild {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-300 group-hover:scale-x-100" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
