# Steg-for-steg: Legge inn video i prosjekt

## Hva som ikke fungerer?

Hvis videoen ikke vises, sjekk følgende:

1. **Har du lagt til `video`-feltet i prosjektet?**
   - Åpne `src/components/sections/Portfolio.tsx`
   - Finn prosjektet du vil legge til video i
   - Legg til `video:` feltet (se eksempler under)

2. **Er video-ID eller filnavn riktig?**
   - YouTube: Sjekk at ID-en er riktig
   - Lokal fil: Sjekk at filen ligger i `public/videos/`

3. **Har du lagret filen?**
   - Ctrl+S i editoren
   - Vent på at nettsiden oppdaterer seg

## Steg-for-steg guide

### Metode 1: YouTube (Anbefalt)

1. **Last opp video til YouTube**
   - Gå til youtube.com
   - Last opp videoen
   - Vent til den er ferdig prosessert

2. **Kopier video-ID**
   - Åpne videoen på YouTube
   - Kopier URL-en: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video-ID er delen etter `v=`: `dQw4w9WgXcQ`

3. **Legg til i koden**
   - Åpne `src/components/sections/Portfolio.tsx`
   - Finn prosjektet (f.eks. "Prosjekt 1")
   - Legg til `video:` feltet:

```tsx
{
  id: '1',
  title: 'Prosjekt 1',
  // ... andre felter ...
  video: {
    youtubeId: 'dQw4w9WgXcQ', // Bytt ut med din video-ID
    poster: '/images/portfolio/prosjekt1.jpg', // Valgfritt
  },
}
```

4. **Lagre og test**
   - Lagre filen (Ctrl+S)
   - Åpne nettsiden i nettleseren
   - Gå til "Vårt arbeid"
   - Klikk på prosjektet
   - Videoen skal vises i popup!

### Metode 2: Lokal video

1. **Kopier video-filen**
   - Kopier MP4-filen til: `C:\Users\paalg\Downloads\Nexra1\public\videos\`
   - F.eks: `prosjekt1.mp4`

2. **Legg til i koden**
   - Åpne `src/components/sections/Portfolio.tsx`
   - Legg til:

```tsx
{
  id: '1',
  title: 'Prosjekt 1',
  // ... andre felter ...
  video: {
    src: '/videos/prosjekt1.mp4', // Filnavnet du la i public/videos/
    poster: '/images/portfolio/prosjekt1.jpg', // Valgfritt
  },
}
```

3. **Lagre og test**
   - Lagre filen
   - Test på nettsiden

## Eksempel: Komplett prosjekt med video

```tsx
{
  id: '1',
  title: 'Panorama Bowling Molde',
  description: 'Moderne nettside for bowling-senter.',
  fullDescription: 'Vi bygde en moderne, konverteringsfokusert nettside...',
  image: '/images/portfolio/panorama.jpg',
  category: 'Nettside',
  link: 'https://panorama-bowling-molde-e23b1e.webflow.io/',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  results: [
    'Økt konvertering med 40%',
    'Redusert laste tid med 60%',
  ],
  // YouTube video:
  video: {
    youtubeId: 'dQw4w9WgXcQ', // Bytt ut med din video-ID
    poster: '/images/portfolio/panorama.jpg',
  },
}
```

## Feilsøking

**Videoen vises ikke:**
- Sjekk at du har lagret filen
- Sjekk at video-ID er riktig (ingen mellomrom, riktig lengde)
- Sjekk konsollen i nettleseren (F12) for feilmeldinger
- Prøv hard refresh: Ctrl+Shift+R

**YouTube video vises ikke:**
- Sjekk at videoen er offentlig (ikke privat)
- Sjekk at video-ID er riktig kopiert
- Prøv å åpne YouTube URL-en direkte i nettleseren

**Lokal video fungerer ikke:**
- Sjekk at filen ligger i `public/videos/`
- Sjekk at filnavnet er riktig (case-sensitive)
- Sjekk at filen er MP4-format
- Sjekk filstørrelse (maks 10MB anbefalt)

## Hjelp

Hvis det fortsatt ikke fungerer:
1. Gi meg YouTube URL eller video-ID
2. Eller si hvilket prosjekt du vil legge til video i
3. Så legger jeg det inn for deg! 🎥

