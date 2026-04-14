const NAV = [
  { label: "Services", href: "#services" },
  { label: "Über uns", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 h-14">
      {/* Header-Hintergrund — initial transparent, faded via GSAP ein. */}
      <div
        id="header-bg"
        aria-hidden="true"
        className="absolute inset-0 border-b border-white/10 opacity-0 backdrop-blur-md"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
      />
      <nav className="relative flex h-full items-center justify-between px-6">
        {/* Kleines ACAB-Header-Logo — initial unsichtbar, faded via GSAP ein. */}
        <a
          href="#hero"
          id="header-logo"
          className="font-serif font-black uppercase tracking-tight text-white opacity-0"
          style={{ fontSize: "24px", letterSpacing: "0.02em" }}
        >
          ACAB
        </a>
        <ul className="hidden gap-8 text-xs uppercase tracking-[0.25em] text-white/80 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
