"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Über uns", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Kontakt", href: "#contact" },
];

export default function Header() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    gsap.set(bg, { opacity: 0 });

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      gsap.set(bg, { opacity: 1 });
      return;
    }

    const tween = gsap.to(bg, {
      opacity: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: 0,
        end: () => window.innerHeight,
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-30 h-14">
      <div
        ref={bgRef}
        aria-hidden="true"
        className="absolute inset-0 border-b border-white/10 bg-black/85 backdrop-blur-md"
      />
      <nav className="relative flex h-full items-center justify-end px-6">
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
