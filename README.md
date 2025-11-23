# Nexra - AI-automatiseringsbyrå

En komplett, produksjonsklar nettside for AI-byrået Nexra, bygget med Next.js, React, TypeScript, Tailwind CSS og Framer Motion.

## 🚀 Teknologi-stack

- **Next.js 14** (App Router)
- **React 18** med TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animasjoner
- **React Intersection Observer** for scroll-animasjoner

## 📦 Installasjon

1. Installer avhengigheter:
```bash
npm install
```

2. Kjør utviklingsserver:
```bash
npm run dev
```

3. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren.

## 🏗️ Prosjektstruktur

```
src/
├── app/
│   ├── layout.tsx          # Root layout med metadata og fonter
│   ├── page.tsx            # Hovedside
│   └── globals.css         # Globale styles og Tailwind
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Navigasjonsbar
│   │   └── Footer.tsx      # Footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero-seksjon
│   │   ├── Services.tsx    # Tjenester-seksjon
│   │   ├── CaseStudies.tsx # Casestudier og resultater
│   │   ├── Pricing.tsx     # Priser og pakker
│   │   ├── About.tsx       # Om Nexra
│   │   └── Contact.tsx     # Kontakt-seksjon
│   └── ui/
│       ├── CTAButton.tsx        # Gjenbrukbar CTA-knapp
│       ├── BackgroundParticles.tsx # Interaktiv partikkelbakgrunn
│       ├── AnimatedCounter.tsx  # Animerte tellere
│       └── BookingModal.tsx     # Booking/kontakt-modal
```

## 🎨 Design-funksjoner

- **Dark mode** som base med neon-glød (blå/cyan/lilla)
- **Glassmorphism**-paneler med blur og transparency
- **Responsivt design** for mobil, nettbrett og desktop
- **Interaktive animasjoner** med Framer Motion
- **Partikkelbakgrunn** som reagerer på musebevegelser
- **Smooth scroll**-animasjoner ved scrolling

## ✨ Funksjoner

- ✅ Komplett landing page med alle nødvendige seksjoner
- ✅ Booking-modal med validering
- ✅ Animerte tellere for KPI-visning
- ✅ Responsiv navigasjon med mobilmeny
- ✅ SEO-optimalisert med metadata
- ✅ Tilgjengelighetsfunksjoner (ARIA, fokus-states)
- ✅ TypeScript med strenge typer

## 🎯 Seksjoner

1. **Hero** - Hovedoverskrift med CTA-knapper
2. **Tjenester** - Fire hovedtjenester med ikoner
3. **Casestudier** - KPI-resultater, før/etter-sammenligning og testimonials
4. **Priser** - Tre pakker (Starter, Growth, Full Automation)
5. **Om Nexra** - Misjon, visjon og team
6. **Kontakt** - Kontaktskjema og booking-funksjonalitet

## 🛠️ Bygg for produksjon

```bash
npm run build
npm start
```

## 📝 Notater

- Alle bilder bruker placeholder eller gradient-bakgrunner
- Booking-modal simulerer form submission (kan kobles til backend)
- Partikkelbakgrunn er interaktiv og reagerer på musebevegelser
- Alle CTA-knapper kan enkelt kobles til eksterne tjenester eller API-er

## 🔧 Videreutvikling

Prosjektet er bygget med modularitet i tankene, og det er enkelt å:
- Legge til nye seksjoner
- Endre innhold i konfig-objekter
- Utvide med flere sider ved behov
- Koble til backend-API for form submissions


