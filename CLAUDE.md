# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt
Single-page Website für ACAB (All Car's All Bike's) GmbH — Autowerkstatt in Malters LU.
Domain: allcarsallbikes.ch · Repo: github.com/Filip9611/acab-website (main = production)

## Kunde
- Inhaber: Ardian Desku
- Adresse: Eistrasse 3, 6102 Malters
- Tel: +41 79 869 13 04
- E-Mail: acab.garage@hotmail.com
- Google: 5.0★ (1 Rezension)

## Services
Mechanik · Spenglerei & Lack · Aufbereitung · KFZ-Service · MFK-Vorbereitung · Autohandel

Diese 6 Services sind die Single-Source-of-Truth. Sie erscheinen in **mindestens 5 Stellen** konsistent: Hero Trust Bar (`Hero.tsx` SERVICES-Array), Services Section Cards, Footer Leistungen-Liste, About-Fliesstext und JSON-LD `hasOfferCatalog` in `layout.tsx`. Bei Änderungen **alle** Stellen synchronisieren.

## Öffnungszeiten
Mo-Fr: 09:00-18:30 | Sa & So: Geschlossen

## Commands

```bash
npm run dev      # Dev server (Turbopack, Port 3000)
npm run build    # Production build (Turbopack)
npm start        # Production server

# Einmalig / selten:
node scripts/generate-assets.mjs   # Regeneriert og-image.jpg, favicon.ico, apple-touch-icon.png aus Inline-SVG via sharp
```

Kein ESLint, keine Tests konfiguriert. Deploy: `git push origin main` → Vercel auto-deploy.

**Windows-Gotcha:** `npm run build` nicht parallel zum laufenden Dev-Server ausführen — Turbopack schreibt beide in `.next/` und zerschiesst die Manifest-Files (ENOENT auf `_buildManifest.js.tmp.*`). Fix: Dev stoppen → `rm -rf .next` → neu starten.

## Architektur

**Stack:** Next.js 15 (App Router, Turbopack, Next 16-Doku gilt NICHT), React 19, TypeScript, Tailwind CSS v4, GSAP 3.15 + ScrollTrigger, Lucide Icons, Sharp (Asset-Pipeline).

### Route-Struktur
Single-Page-App. `src/app/page.tsx` rendert alle Sections in Reihenfolge (Hero → Services → About → Gallery → Contact). `src/app/layout.tsx` lädt Fonts (Playfair Display + Inter via `next/font/google`), setzt CSS-Vars, exportiert umfangreiche `metadata` (OG, Twitter, JSON-LD AutoRepair inline als Script-Tag), rendert Skip-Link + Header + main + Footer + ScrollToTop.

### Komponenten-Organisation
- `src/components/layout/` — Header (Client, Hamburger-Nav), Footer (Server)
- `src/components/sections/` — Hero, Services, About, Gallery, Contact (je 1 Modul)
- `src/components/ui/` — ScrollToTop (Client, fixed FAB)
- `src/lib/animations.ts` — Zentrale GSAP-Plugin-Registrierung (ScrollTrigger). **IMMER** `import { gsap } from "@/lib/animations"` verwenden, nie direkt aus `"gsap"`, sonst fehlt der Plugin.

### Section-Pattern
Alternierender Background: Hero `bg-black` → Services `bg-[#0A0A0A]` → About `bg-black` → Gallery `bg-[#0A0A0A]` → Contact `bg-black` → Footer `bg-black`. Section-IDs (`#hero`, `#services`, `#about`, `#gallery`, `#contact`) stimmen mit Header-Nav-Anchors überein.

### Hero: Video-Knockout-Technik
Die Signature-Optik "Video nur durch die Buchstaben sichtbar" wird über **mix-blend-multiply** erreicht, nicht über `background-clip: text` (weil letzteres nicht mit `<video>` funktioniert):

1. Layer 1 (absolute): animierter Grau-Gradient (Fallback wenn Video fehlt)
2. Layer 2 (absolute): `<video autoPlay muted loop playsInline preload="auto">` mit `/videos/hero.mp4`, `object-cover object-[center_85%] brightness-[1.3] contrast-[1.2]`
3. Layer 3 (absolute): `<div class="bg-black mix-blend-multiply">` mit weissem Text inside → Schwarz × Video = Schwarz, Weiss × Video = Video sichtbar durch Text

Section hat `[isolation:isolate]` für stabiles Blend-Rendering auf iOS Safari. Der Knockout gilt auf **allen** Breakpoints identisch (keine Mobile-Abweichung).

### Scroll-Animation-Architektur
Scroll-Effekte laufen als GSAP ScrollTriggers in Client-Komponenten (`"use client"`):

- **Hero.tsx** orchestriert den Crossfade zum Header: eine einzige Timeline mit `trigger: heroRef, start: "top top", end: "bottom top", scrub: true` fadet Hero-Inhalte aus (0→70% Progress) und Header-Elemente ein (70→100%). Header-Targets werden via `document.querySelector("#header-logo")` / `#header-bg` aufgelöst — **Cross-Component-Koordination über DOM-IDs, nicht Refs**.
- **Header.tsx** hat useEffect nur für das Mobile-Hamburger-Overlay-State (useState + Body-Scroll-Lock + ESC-Key). Die initial unsichtbaren Elemente `#header-logo` + `#header-bg` mit `opacity-0` werden von Hero's Timeline angesprochen.

**GSAP-Cleanup-Pattern**: `gsap.context(() => { ... })` + `return () => ctx.revert()` im useEffect-Return — killt alle Tweens und zugehörige ScrollTriggers bei Unmount. Immer `matchMedia("(prefers-reduced-motion: reduce)")` prüfen und bei true den Animation-Setup überspringen.

### Mobile-Anpassungen
- **Hamburger-Nav** in Header.tsx (`md:hidden` → Button; Fullscreen-Overlay mit z-50 + Body-Scroll-Lock via useEffect + ESC-Key-Listener)
- **Trust Bar Marquee** im Hero: auf Mobile endlose horizontale Laufschrift (CSS `animate-marquee` — duplicated items + `translateX(0→-50%)` für seamless loop); auf `md:` statische Zeile mit `·` Trennpunkten
- **Section-Paddings** mobile-first: `py-16 md:py-32 lg:py-40` durchgängig
- **About Stats-Bar**: 3-spaltig auf allen Breakpoints (`grid-cols-3`), mit skalierten Font-Grössen
- **ScrollToTop-FAB**: erscheint nach `scrollY > 600`, `fixed bottom-6 right-6 z-50`, `h-10 w-10 md:h-12 md:w-12`

## Design-System

### globals.css — Konventionen
- **Fonts** als CSS-Vars (`--font-playfair`, `--font-inter`) via `next/font`, exposed als `font-serif` / `font-sans` Tailwind-Utilities über `@theme inline`.
- **Custom Animations** in `@theme inline` als `--animate-*` registrieren → Tailwind generiert `animate-*` Utility automatisch. Aktuell: `shimmer`, `chevron`, `marquee`.
- **Globale `*:focus-visible`-Regel** zeigt `outline: 2px solid #B91C1C; outline-offset: 2px` auf allen keyboard-fokussierten Elementen. `*:focus { outline: none }` als Reset.
- **`.skip-link`** Klasse: Skip-to-Content-Link, `position: fixed`, versteckt via `translateY(-200%)`, erscheint auf `:focus-visible`.
- **Globale `prefers-reduced-motion`-Regel** reduziert alle CSS-Animationen auf 0.01ms.

### Akzentfarbe
`#B91C1C` (tiefes Rot) **ausschliesslich für CTAs/Fokus/Hover** — Header-Nav-Hover, Gallery "Projekt anfragen", Contact "Senden"-Button, Footer "Anfrage stellen", focus-visible Outline. WhatsApp behält Brand-Grün `#25D366`. Alles andere streng monochrom.

### Design-Richtlinien
- Monochrom: Schwarz (#000), Near-Black (#0A0A0A), Graustufen — keine bunten Farben ausser Akzent (s.o.)
- Stil: Industrial, rau, Werkstatt-Ästhetik, High-End Automotive
- Logo: Serif "ACAB" (Playfair Black) + Sans "All Car's All Bike's" (mit Apostrophen, projektweit konsistent)
- Headlines Serif, Body Sans
- Zweizeilige Section-Headlines mit `text-white/30` auf der zweiten Zeile

## Assets
- `public/videos/hero.mp4` — 4.2 MB, 1600p, CRF 24, MP4 (H.264 High Profile, faststart, tonlos). Neu komprimieren: siehe `ffmpeg`-Command in Commit-History oder mit `"$FFMPEG" -i source.mp4 -vf scale=1600:-2 -crf 24 -preset slow -movflags +faststart -an out.mp4`.
- `public/images/werkstatt.webp` — 40 KB, 4:5 Format für About-Section
- `public/og-image.jpg`, `public/favicon.ico`, `public/apple-touch-icon.png` — via `scripts/generate-assets.mjs` aus Inline-SVG generiert (sharp)
- `public/sitemap.xml`, `public/robots.txt` — statisch

## Regeln
- Mobile-first responsive
- Sprache: Deutsch (Schweiz) — alle UI-Texte, kein `ß` (nur `ss`)
- Accessibility: WCAG 2.1 AA, `*:focus-visible` durchgängig, Skip-Link vorhanden
- Keine Em-/En-Dashes (`—` `–`) im Content — natürliche Sprache mit Punkten/Kommas
- Texte ohne Gedankenstriche halten (Ausnahme: sr-only Text im H1 darf `–` enthalten)

## Tools & Skills
- **21st.dev Magic MCP** — `/ui` und `21st_magic_component_builder` für hochwertige UI-Komponenten
- **GSAP Master MCP** — `gsap-master` für produktionsreifen Animations-Code
- **UI/UX Pro Max Skill** — Design-Systeme basierend auf Branche und Stil
- Diese Tools AKTIV nutzen — keine generischen Lösungen
