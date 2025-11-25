# Hvordan legge inn video i prosjekter

## Steg 1: Velg video-type

Du har tre alternativer:

### Alternativ 1: YouTube (Anbefalt - Enklest)
1. Last opp videoen til YouTube
2. Kopier video-ID fra URL-en:
   - `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
   - `https://youtu.be/dQw4w9WgXcQ` → `dQw4w9WgXcQ`

### Alternativ 2: Vimeo
1. Last opp videoen til Vimeo
2. Kopier video-ID fra URL-en:
   - `https://vimeo.com/123456789` → `123456789`

### Alternativ 3: Lokal video
1. Last opp video-filen til `public/videos/` mappen
2. Bruk filnavnet i koden

## Steg 2: Legg til video i prosjektet

Åpne filen: `src/components/sections/Portfolio.tsx`

Finn prosjektet du vil legge til video i, og legg til `video`-feltet:

### Eksempel 1: YouTube

```tsx
{
  id: '1',
  title: 'Prosjekt 1',
  description: 'Kort beskrivelse...',
  image: '/images/portfolio/prosjekt1.jpg',
  // ... andre felter ...
  video: {
    youtubeId: 'dQw4w9WgXcQ', // Bytt ut med din YouTube video-ID
    poster: '/images/portfolio/prosjekt1.jpg', // Valgfritt: thumbnail
  },
}
```

### Eksempel 2: Vimeo

```tsx
{
  id: '1',
  title: 'Prosjekt 1',
  // ... andre felter ...
  video: {
    vimeoId: '123456789', // Bytt ut med din Vimeo video-ID
  },
}
```

### Eksempel 3: Lokal video

```tsx
{
  id: '1',
  title: 'Prosjekt 1',
  // ... andre felter ...
  video: {
    src: '/videos/prosjekt1.mp4', // Filen må ligge i public/videos/
    poster: '/images/portfolio/prosjekt1.jpg', // Valgfritt: thumbnail
  },
}
```

## Steg 3: Test

1. Lagre filen
2. Åpne nettsiden i nettleseren
3. Gå til "Vårt arbeid"-seksjonen
4. Klikk på prosjektet med videoen
5. Videoen skal vises i popup-vinduet!

## Tips

✅ **Anbefalt:**
- Bruk YouTube eller Vimeo (bedre ytelse)
- Legg til `poster` (thumbnail) for bedre UX
- Test på mobil og desktop

❌ **Unngå:**
- For store video-filer lokalt (>10MB)
- Autoplay med lyd (irriterende)

## Eksempel: Komplett prosjekt med video

```tsx
{
  id: '1',
  title: 'Panorama Bowling Molde',
  description: 'Moderne nettside for bowling-senter.',
  fullDescription: 'Vi bygde en moderne, konverteringsfokusert nettside for Panorama Bowling Molde. Nettsiden inkluderer online booking, menysystem og integrert betalingsløsning.',
  image: '/images/portfolio/panorama.jpg',
  category: 'Nettside',
  link: 'https://panorama-bowling-molde-e23b1e.webflow.io/',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  results: [
    'Økt konvertering med 40%',
    'Redusert laste tid med 60%',
  ],
  video: {
    youtubeId: 'dQw4w9WgXcQ', // Bytt ut med din video-ID
    poster: '/images/portfolio/panorama.jpg',
  },
}
```

## Hjelp

Hvis du trenger hjelp:
1. Gi meg YouTube/Vimeo URL eller video-ID
2. Eller si hvilket prosjekt du vil legge til video i
3. Så legger jeg det inn for deg! 🎥

