# Guide: Hvordan legge inn bilder i Nexra-prosjektet

## 1. Statiske bilder (anbefalt)

### Steg 1: Legg bildene i `public`-mappen

Opprett en struktur som dette:
```
public/
  images/
    team/
      fredrik.jpg
      emil.jpg
      mats.jpg
    hero/
      background.jpg
    logo/
      nexra-logo.png
```

### Steg 2: Bruk Next.js Image-komponenten

```tsx
import Image from 'next/image'

// Eksempel i en komponent:
<Image
  src="/images/team/fredrik.jpg"
  alt="Fredrik Nerlandsrem"
  width={200}
  height={200}
  className="rounded-full"
/>
```

**Viktig:** 
- Bildene må ligge i `public`-mappen
- Stien starter med `/` (f.eks. `/images/team/fredrik.jpg`)
- `width` og `height` er påkrevd (eller bruk `fill` med `relative` parent)

## 2. Eksempel: Legg inn team-bilder

### Steg 1: Legg bildene i `public/images/team/`
- `fredrik.jpg`
- `emil.jpg`
- `mats.jpg`

### Steg 2: Oppdater `src/components/sections/About.tsx`

```tsx
const teamMembers: TeamMember[] = [
  {
    name: 'Fredrik Nerlandsrem',
    role: 'Founder • AI Engineer • Fullstack Developer',
    bio: '...',
    image: '/images/team/fredrik.jpg', // Legg til bildestien her
  },
  // ... osv
]
```

## 3. Eksterne bilder (fra URL)

Hvis du vil bruke bilder fra eksterne kilder, må du legge til domenet i `next.config.js`:

```js
images: {
  domains: ['images.unsplash.com', 'din-bildehost.com'],
}
```

Deretter kan du bruke:
```tsx
<Image
  src="https://images.unsplash.com/photo-..."
  alt="Beskrivelse"
  width={500}
  height={300}
/>
```

## 4. Optimaliserte bilder

Next.js Image-komponenten optimaliserer automatisk bildene:
- ✅ Automatisk formatering (WebP når støttet)
- ✅ Lazy loading
- ✅ Responsive bilder
- ✅ Forbedret ytelse

## 5. Eksempler på bruk

### Hero-bakgrunnsbilde:
```tsx
<div className="relative">
  <Image
    src="/images/hero/background.jpg"
    alt="Hero background"
    fill
    className="object-cover opacity-20"
    priority
  />
</div>
```

### Logo:
```tsx
<Image
  src="/images/logo/nexra-logo.png"
  alt="Nexra Logo"
  width={150}
  height={50}
/>
```

### Team-medlem:
```tsx
<Image
  src="/images/team/fredrik.jpg"
  alt="Fredrik Nerlandsrem"
  width={200}
  height={200}
  className="rounded-full"
/>
```

## Tips

1. **Bildestørrelser:** Optimaliser bildene før du legger dem inn (bruk f.eks. TinyPNG)
2. **Formater:** Bruk JPG for fotografier, PNG for logoer med transparens
3. **Navngiving:** Bruk beskrivende filnavn (f.eks. `fredrik-nerlandsrem.jpg` i stedet for `img1.jpg`)
4. **Størrelser:** For team-bilder, anbefaler vi 400x400px eller større
5. **Alt-tekst:** Alltid legg til beskrivende `alt`-tekst for tilgjengelighet

## Oppdatert komponent

About-komponenten er allerede oppdatert til å støtte bilder. Bare legg til `image`-feltet i `teamMembers`-arrayet!


