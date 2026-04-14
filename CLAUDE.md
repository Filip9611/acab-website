# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projekt
Single-page Website für ACAB (All Cars All Bikes) GmbH — Autowerkstatt in Malters LU.
Domain: allcarsallbikes.ch

## Kunde
- Inhaber: Ardian Desku
- Adresse: Eistrasse 3, 6102 Malters
- Tel: +41 79 869 13 04
- E-Mail: acab.garage@hotmail.com
- Google: 5.0★ (1 Rezension)

## Services
Mechanik, Spenglerei & Lack, Aufbereitung, KFZ-Service, MFK-Vorbereitung, Autohandel

## Öffnungszeiten
Mo-Fr: 09:00-18:30 | Sa+So: Geschlossen

## Commands

```bash
npm run dev      # Dev server (Turbopack, Port 3000)
npm run build    # Production build (Turbopack)
npm start        # Production server
```

Kein ESLint, keine Tests konfiguriert.

**Windows-Gotcha:** `npm run build` nicht parallel zum laufenden Dev-Server ausführen — Turbopack schreibt beide in `.next/` und zerschiesst die Manifest-Files (ENOENT auf `_buildManifest.js.tmp.*`). Fix: Dev stoppen → `rm -rf .next` → neu starten.

## Architektur

**Stack:** Next.js 15 (App Router, Turbopack, Next 16-Doku gilt NICHT), React 19, TypeScript, Tailwind CSS v4, GSAP 3.15 (ScrollTrigger + SplitText), Lucide Icons, Sharp.

### Route-Struktur
Single-Page-App. `src/app/page.tsx` rendert alle Sections in Reihenfolge (Hero → Services → About → Gallery → Contact). `src/app/layout.tsx` lädt Fonts über `next/font/google` (Playfair Display + Inter), setzt CSS-Variablen an `<html>`, rendert `<Header />`, `<main>{children}</main>`, `<Footer />`.

### Komponenten-Organisation
- `src/components/layout/` — Header, Footer
- `src/components/sections/` — Hero, Services, About, Gallery, Contact (je 1 Modul pro Section)
- `src/components/ui/` — Shared UI-Primitives (leer, für shadcn-ähnliche Komponenten reserviert)
- `src/lib/animations.ts` — Zentrale GSAP-Plugin-Registrierung. **IMMER** `import { gsap } from "@/lib/animations"` verwenden, nie direkt aus `"gsap"`, sonst fehlen ScrollTrigger/SplitText.

### Section-Pattern
Sektionen alternieren Background für visuelle Trennung: Hero `bg-black` → Services `bg-[#0A0A0A]` → About `bg-black` → Gallery `bg-[#0A0A0A]` → Contact `bg-black` → Footer `bg-black`. Section-IDs (`#services`, `#about`, `#gallery`, `#contact`) stimmen mit Header-Nav-Anchors überein → native Smooth-Scroll.

### Scroll-Animation-Architektur
Scroll-Effekte laufen als GSAP ScrollTriggers in Client-Komponenten (`"use client"`):

- **Hero.tsx** orchestriert den Crossfade: Timeline mit `trigger: heroRef, start: "top top", end: "60% top", scrub: true` blendet Hero-Inhalte (Logo-Block, Services-Leiste, Chevron) auf opacity 0 während Header-Elemente (`#header-logo`, `#header-bg`) via ID-Selector auf opacity 1 gefaded werden. Cross-Component-Koordination über DOM-IDs, nicht Refs.
- **Header.tsx** hat **keinen** eigenen useEffect mehr (wurde ausgelagert). Rein deklarative Server-Component mit initial unsichtbaren Elementen (`opacity-0`), die von Hero's Timeline angesprochen werden.

**GSAP-Cleanup-Pattern**: `gsap.context(() => { ... })` + `return () => ctx.revert()` im useEffect-Return — killt alle Tweens und zugehörige ScrollTriggers bei Unmount. Immer `matchMedia("(prefers-reduced-motion: reduce)")` checken und bei true den Animation-Setup skippen.

## Design-System

### globals.css — Konventionen
- **Fonts** als CSS-Vars (`--font-playfair`, `--font-inter`) via `next/font`, exposed als `font-serif` / `font-sans` Tailwind-Utilities über `@theme inline`.
- **Custom Animations** in `@theme inline` als `--animate-*` registrieren → Tailwind generiert `animate-*` Utility automatisch (z.B. `--animate-chevron` → `animate-chevron`).
- **Globale `prefers-reduced-motion`-Regel** auf `*, *::before, *::after` reduziert alle CSS-Animationen auf 0.01ms.

### Signature-Effekt: `.acab-hero-title`
Animierter Grau-Gradient durch Text via `background-clip: text` + `-webkit-text-fill-color: transparent`. Fallback `color: #ffffff` im Basis-Selektor, Gradient-Anwendung in `@supports`-Guard. **Auf Parent-Element** anwenden damit der Shimmer über mehrere Text-Kinder synchron läuft (eine geteilte Background-Fläche, eine Animation).

### Design-Richtlinien
- Monochrom: Schwarz, Weiss, Graustufen — keine bunten Farben
- Stil: Industrial, rau, Werkstatt-Ästhetik
- Logo: Serif "ACAB" (Playfair Black) + Sans "All Car's All Bike's"
- Headlines Serif, Body Sans

## Regeln
- Mobile-first responsive
- Sprache: Deutsch (Schweiz) — alle UI-Texte
- Accessibility: WCAG 2.1 AA
- SEO: Meta-Tags, Open Graph, JSON-LD Schema (LocalBusiness) — noch TODO
- Video (wenn später integriert): WebM + MP4 Fallback, lazy-loaded, autoplay muted loop

## Tools & Skills
- **21st.dev Magic MCP** — `/ui` und `21st_magic_component_builder` für hochwertige UI-Komponenten
- **GSAP Master MCP** — `gsap-master` für produktionsreifen Animations-Code (ScrollTrigger, SplitText, MorphSVG)
- **UI/UX Pro Max Skill** — Design-Systeme basierend auf Branche und Stil
- Diese Tools AKTIV nutzen — keine generischen Lösungen
