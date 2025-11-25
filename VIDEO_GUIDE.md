# Guide: Legge inn videoer på nettsiden

Nettsiden støtter nå videoer! Du kan legge inn videoer på flere måter.

## Støttede video-typer

1. **YouTube** - Enklest og anbefalt
2. **Vimeo** - Profesjonelt alternativ
3. **Lokale videoer** - Last opp videoer direkte til prosjektet
4. **Eksterne video-URLer** - Direkte lenker til video-filer

## Hvor kan du legge inn videoer?

### 1. Case Studies / Testimonials
Videoer kan legges til i testimonials (kundeanmeldelser).

### 2. Portfolio / Prosjekter
Videoer kan legges til i prosjektvisninger.

### 3. Hero-seksjonen
Bakgrunnsvideo eller showcase-video.

### 4. About-seksjonen
Team-presentasjoner eller bedriftsvideoer.

## Hvordan legge inn videoer

### Metode 1: YouTube (Anbefalt)

1. Last opp videoen til YouTube
2. Kopier video-ID fra URL-en:
   - `https://www.youtube.com/watch?v=VIDEO_ID` → `VIDEO_ID`
   - `https://youtu.be/VIDEO_ID` → `VIDEO_ID`

3. Legg til i koden:

```tsx
<VideoPlayer
  youtubeId="VIDEO_ID"
  controls={true}
  className="rounded-xl"
/>
```

**Eksempel i Case Studies:**
```tsx
const testimonials: Testimonial[] = [
  {
    name: 'Sarah Hansen',
    role: 'CEO',
    company: 'TechGrowth AS',
    text: 'Nexra har transformert hvordan vi håndterer kundeservice...',
    video: {
      youtubeId: 'dQw4w9WgXcQ', // Bytt ut med din video-ID
    }
  },
]
```

### Metode 2: Vimeo

1. Last opp videoen til Vimeo
2. Kopier video-ID fra URL-en:
   - `https://vimeo.com/VIDEO_ID` → `VIDEO_ID`

3. Legg til i koden:

```tsx
<VideoPlayer
  vimeoId="VIDEO_ID"
  controls={true}
  className="rounded-xl"
/>
```

### Metode 3: Lokal video

1. Last opp video-filen til `public/videos/` mappen
2. Legg til i koden:

```tsx
<VideoPlayer
  src="/videos/din-video.mp4"
  poster="/images/video-thumbnail.jpg" // Valgfritt: thumbnail
  controls={true}
  className="rounded-xl"
/>
```

**Opprett mappen:**
```bash
mkdir -p public/videos
```

### Metode 4: Ekstern video-URL

```tsx
<VideoPlayer
  src="https://eksempel.com/video.mp4"
  poster="https://eksempel.com/thumbnail.jpg"
  controls={true}
  className="rounded-xl"
/>
```

## VideoPlayer props

| Prop | Type | Beskrivelse | Standard |
|------|------|-------------|----------|
| `youtubeId` | string | YouTube video ID | - |
| `vimeoId` | string | Vimeo video ID | - |
| `src` | string | URL til video-fil | - |
| `poster` | string | Thumbnail/bilde før video | - |
| `autoplay` | boolean | Start automatisk | `false` |
| `loop` | boolean | Spill i loop | `false` |
| `muted` | boolean | Start stum | `false` |
| `controls` | boolean | Vis kontroller | `true` |
| `aspectRatio` | '16/9' \| '4/3' \| '1/1' \| 'auto' | Bildeformat | `'16/9'` |
| `className` | string | Ekstra CSS-klasser | - |

## Eksempler

### Eksempel 1: YouTube video i Case Studies

```tsx
// I src/components/sections/CaseStudies.tsx
const testimonials: Testimonial[] = [
  {
    name: 'Sarah Hansen',
    role: 'CEO',
    company: 'TechGrowth AS',
    text: 'Nexra har transformert hvordan vi håndterer kundeservice...',
    video: {
      youtubeId: 'dQw4w9WgXcQ', // Din YouTube video-ID
    }
  },
]
```

### Eksempel 2: Video i Hero-seksjonen

```tsx
// I src/components/sections/Hero.tsx
import VideoPlayer from '@/components/ui/VideoPlayer'

// Legg til i JSX:
<VideoPlayer
  youtubeId="VIDEO_ID"
  autoplay={true}
  loop={true}
  muted={true}
  controls={false}
  className="absolute inset-0 w-full h-full"
/>
```

### Eksempel 3: Video i Portfolio

```tsx
// I src/components/sections/Portfolio.tsx
const projects: Project[] = [
  {
    title: 'Prosjekt 1',
    // ... andre felter
    video: {
      youtubeId: 'VIDEO_ID',
      poster: '/images/portfolio/project1-thumb.jpg',
    }
  },
]
```

## Beste praksis

✅ **Anbefalt:**
- Bruk YouTube eller Vimeo (bedre ytelse, ingen lagring)
- Komprimer videoer før opplasting (mindre filstørrelse)
- Legg til thumbnail/poster for bedre UX
- Test på mobil og desktop

❌ **Unngå:**
- For store video-filer lokalt (>10MB)
- Autoplay med lyd (irriterende for brukere)
- For mange videoer på samme side (ytelsesproblemer)

## Optimalisering

### For lokale videoer:
1. Komprimer videoer med [HandBrake](https://handbrake.fr/) eller lignende
2. Bruk MP4-format (best kompatibilitet)
3. Anbefalt størrelse: maks 5-10MB per video
4. Bruk poster/thumbnail for raskere lasting

### For YouTube/Vimeo:
- Ingen optimalisering nødvendig - de håndterer det automatisk!

## Hjelp

Hvis du trenger hjelp med å legge inn videoer, si fra hvor du vil ha dem, og jeg hjelper deg med koden! 🎥

