# Guide: Hvordan publisere Nexra-nettsiden til internett

## Metode 1: Vercel (Anbefalt - Gratis og enkelt)

Vercel er laget av Next.js-teamet og er den enkleste måten å publisere Next.js-nettsider.

### Steg 1: Bygg prosjektet lokalt (valgfritt, for testing)
```bash
npm run build
```

### Steg 2: Opprett Vercel-konto
1. Gå til [vercel.com](https://vercel.com)
2. Klikk "Sign Up" og logg inn med GitHub, GitLab eller e-post

### Steg 3: Installer Vercel CLI (valgfritt)
```bash
npm install -g vercel
```

### Steg 4: Deploy fra terminal
```bash
vercel
```
Følg instruksjonene i terminalen. Vercel vil:
- Spørre om du vil linke til et eksisterende prosjekt eller lage et nytt
- Automatisk detektere Next.js
- Deploye nettsiden

### Steg 5: Deploy fra Vercel Dashboard (Alternativ)
1. Gå til [vercel.com/dashboard](https://vercel.com/dashboard)
2. Klikk "Add New Project"
3. Importer GitHub-repository (hvis du har lagt koden på GitHub)
   - Eller dra og slipp prosjektmappen din
4. Vercel vil automatisk detektere Next.js og sette opp alt
5. Klikk "Deploy"

### Steg 6: Få din nettside-URL
Etter deploy får du en URL som:
- `nexra-xyz123.vercel.app` (gratis domene)
- Du kan også legge til eget domene senere

---

## Metode 2: Netlify (Alternativ)

### Steg 1: Bygg kommando
I Netlify-dashboard, sett:
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### Steg 2: Deploy
1. Gå til [netlify.com](https://netlify.com)
2. Dra og slipp `out`-mappen (hvis du eksporterer statisk)
   - Eller koble til GitHub for automatisk deploy

---

## Metode 3: GitHub Pages (Statisk eksport)

Hvis du vil bruke GitHub Pages, må du eksportere som statisk side:

### Steg 1: Oppdater `next.config.js`
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

### Steg 2: Bygg og eksporter
```bash
npm run build
```

### Steg 3: Deploy til GitHub Pages
1. Push koden til GitHub
2. Gå til repository settings
3. Velg "Pages" i menyen
4. Velg branch og mappe (`out`)

---

## Metode 4: Egen server (VPS/Cloud)

### Steg 1: Bygg prosjektet
```bash
npm run build
```

### Steg 2: Start produksjonsserver
```bash
npm start
```

### Steg 3: Sett opp reverse proxy (Nginx)
```nginx
server {
    listen 80;
    server_name dittdomene.no;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Viktige ting å huske før deploy:

### 1. Miljøvariabler
Hvis du har API-nøkler eller secrets, legg dem i `.env.local` og legg til i Vercel/Netlify dashboard.

### 2. Git repository (anbefalt)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/dittbrukernavn/nexra.git
git push -u origin main
```

### 3. Eget domene (valgfritt)
- I Vercel: Settings → Domains → Add Domain
- I Netlify: Domain settings → Add custom domain

### 4. Optimalisering
- Sjekk at alle bilder er optimalisert
- Test at alle lenker fungerer
- Sjekk at booking-modal fungerer

---

## Raskeste vei (Vercel - 5 minutter):

1. **Gå til vercel.com og logg inn**
2. **Klikk "Add New Project"**
3. **Dra og slipp prosjektmappen din** (eller koble til GitHub)
4. **Klikk "Deploy"**
5. **Ferdig!** Du får en URL umiddelbart

---

## Automatisk deploy med GitHub

Hvis du koder på GitHub, kan du sette opp automatisk deploy:

1. Push koden til GitHub
2. Koble Vercel/Netlify til GitHub-repositoryet
3. Hver gang du pusher til `main`-branch, deployes automatisk

---

## Hjelp og support

- **Vercel dokumentasjon:** https://vercel.com/docs
- **Next.js deployment:** https://nextjs.org/docs/deployment
- **Netlify dokumentasjon:** https://docs.netlify.com

---

## Anbefalt: Vercel

For Next.js-prosjekter anbefaler vi **Vercel** fordi:
- ✅ Gratis tier er generøs
- ✅ Automatisk optimalisering
- ✅ Raskeste deploy
- ✅ Beste ytelse for Next.js
- ✅ Enkel setup
- ✅ Automatisk HTTPS
- ✅ CDN inkludert


