# Portfolio-bilder

Legg bilder av prosjekter her.

## Filnavn
- `prosjekt1.jpg` - Første prosjekt
- `prosjekt2.jpg` - Andre prosjekt
- `prosjekt3.jpg` - Tredje prosjekt
- osv...

## Anbefalte bildestørrelser
- Minimum: 800x600px
- Anbefalt: 1200x900px eller større
- Format: JPG eller PNG
- Forhold: 16:9 eller 4:3

## Tips
- Optimaliser bildene før du legger dem inn (bruk f.eks. TinyPNG)
- Bruk skjermbilder av nettsider eller mockups
- Sørg for konsistent stil på alle bildene
- Bruk beskrivende filnavn

## Hvordan legge til prosjekter

1. Legg bildet i denne mappen
2. Oppdater `src/app/vaart-arbeid/page.tsx`
3. Legg til et nytt objekt i `projects`-arrayet:

```tsx
{
  id: '4',
  title: 'Ditt prosjektnavn',
  description: 'Beskrivelse av prosjektet...',
  image: '/images/portfolio/ditt-bilde.jpg',
  category: 'Nettside', // eller 'Nettside + AI', 'Webapplikasjon', etc.
  link: 'https://eksempel.no', // valgfritt
}
```


