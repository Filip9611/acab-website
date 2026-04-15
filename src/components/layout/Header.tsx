"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Über uns", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Body-Scroll sperren während Mobile-Menü offen ist.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC-Key schliesst das Mobile-Menü.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-30 h-14">
        {/* Header-Hintergrund — initial transparent, faded via GSAP ein. */}
        <div
          id="header-bg"
          aria-hidden="true"
          className="absolute inset-0 border-b border-white/10 opacity-0 backdrop-blur-md"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
        />
        <nav className="relative flex h-full items-center px-6">
          {/* ACAB-Header-Logo — absolut positioniert, nimmt keinen Flex-Raum
              ein. Initial unsichtbar, faded via GSAP ein. */}
          <a
            href="#hero"
            id="header-logo"
            className="absolute left-6 font-serif font-black uppercase tracking-tight text-white opacity-0"
            style={{ fontSize: "32px", letterSpacing: "0.02em" }}
          >
            ACAB
          </a>

          {/* Desktop-Nav — initial zentriert via mx-auto. GSAP animiert per
              x-Transform beim Scrollen nach rechts. */}
          <ul
            id="header-nav"
            className="mx-auto hidden gap-8 text-xs uppercase tracking-[0.25em] text-white/80 md:flex"
          >
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-[#B91C1C]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile-Hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto p-2 text-white md:hidden"
            aria-label="Menü öffnen"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </header>

      {/* Mobile-Menü-Overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 flex flex-col bg-black transition-opacity duration-300 md:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-14 items-center justify-between px-6">
          <span
            className="font-serif font-black uppercase tracking-tight text-white"
            style={{ fontSize: "32px", letterSpacing: "0.02em" }}
          >
            ACAB
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 text-white"
            aria-label="Menü schliessen"
          >
            <X className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>
        <ul className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-white/10 py-6 font-serif text-4xl font-black uppercase tracking-tight text-white transition-colors hover:text-[#B91C1C]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
