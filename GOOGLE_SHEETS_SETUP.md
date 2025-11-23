# Google Sheets Setup Guide

## Steg 1: Opprett Google Sheet

1. Gå til [Google Sheets](https://sheets.google.com)
2. Opprett nytt ark
3. Gi det et navn (f.eks. "Nexra Kontaktforespørsler")
4. Legg til disse kolonnene i rad 1:
   - A1: `Dato`
   - B1: `Navn`
   - C1: `E-post`
   - D1: `Selskap`
   - E1: `Antall ansatte`
   - F1: `Melding`
   - G1: `Tjeneste`

## Steg 2: Opprett Google Apps Script

1. I Google Sheets, klikk på **Extensions** → **Apps Script**
2. Slett all eksisterende kode
3. Lim inn denne koden:

```javascript
function doPost(e) {
  try {
    // Hent data fra request
    const data = JSON.parse(e.postData.contents);
    
    // Hent aktivt ark
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Legg til ny rad med data
    sheet.appendRow([
      new Date(), // Dato
      data.name || '',
      data.email || '',
      data.company || '',
      data.employees || '',
      data.message || '',
      data.service || ''
    ]);
    
    // Returner suksess
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Returner feil hvis noe går galt
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Steg 3: Deploy som Web App

1. Klikk på **Deploy** → **New deployment**
2. Klikk på ikonet ved siden av "Select type" og velg **Web app**
3. Fyll ut:
   - **Description:** "Nexra Contact Form Handler"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone" (viktig!)
4. Klikk **Deploy**
5. **Godta autorisasjoner** når Google ber om det:
   - Klikk "Review permissions"
   - Velg din Google-konto
   - Klikk "Advanced" → "Go to [Project Name] (unsafe)"
   - Klikk "Allow"
6. **Kopier Web App URL** (ser ut som: `https://script.google.com/macros/s/.../exec`)

## Steg 4: Legg til URL i Vercel

1. Gå til [Vercel Dashboard](https://vercel.com/dashboard)
2. Velg ditt prosjekt (nexra-nettside)
3. Gå til **Settings** → **Environment Variables**
4. Legg til:
   - **Name:** `GOOGLE_APPS_SCRIPT_URL`
   - **Value:** Lim inn Web App URL-en du kopierte
   - **Environment:** Production, Preview, Development (velg alle)
5. Klikk **Save**

## Steg 5: Redeploy

### Alternativ 1: Fra prosjektoversikten
1. Gå til [Vercel Dashboard](https://vercel.com/dashboard)
2. Klikk på prosjektet ditt (f.eks. "nexra-nettside")
3. Du ser nå en liste over alle deployments (deployment-historikk)
4. Hover over den siste deploymenten (øverst)
5. Klikk på de tre prikkene (⋯) som vises
6. Velg **Redeploy**
7. Vent til deploy er ferdig

### Alternativ 2: Push til GitHub (enklere!)
Hvis du har koblet Vercel til GitHub, kan du bare:
1. Gjør en liten endring i koden (eller bare lag en tom commit)
2. I terminalen:
   ```bash
   git add .
   git commit -m "Update environment variables"
   git push
   ```
3. Vercel deployer automatisk med nye environment variables!

### Alternativ 3: Fra Settings
1. Gå til prosjektet ditt i Vercel Dashboard
2. Klikk på **Settings** i toppmenyen
3. Gå til **Environment Variables** (venstremeny)
4. Etter at du har lagt til variabelen, kan du:
   - Enten pushe til GitHub (automatisk deploy)
   - Eller gå tilbake til prosjektoversikten og redeploy manuelt

## Test

1. Gå til nettsiden din
2. Fyll ut kontaktformularet
3. Send inn
4. Sjekk Google Sheet - du skal se en ny rad med data!

## Feilsøking

### Får du feilmelding?
- Sjekk at Web App URL er riktig
- Sjekk at "Who has access" er satt til "Anyone"
- Sjekk at du har godkjent alle autorisasjoner
- Sjekk Vercel Environment Variables

### Data kommer ikke inn?
- Sjekk Google Apps Script logs: **Executions** i Apps Script
- Sjekk at kolonnene i Sheet matcher koden
- Sjekk at API route fungerer: Se Network-tab i nettleseren

## Sikkerhet

⚠️ **Viktig:** Google Apps Script Web App URL-en er offentlig tilgjengelig. For bedre sikkerhet kan du:
- Legge til API-nøkkel i request
- Implementere rate limiting
- Legge til reCAPTCHA

## Eksempel på forbedret sikkerhet

I Google Apps Script, legg til:

```javascript
function doPost(e) {
  // Sjekk API-nøkkel
  const apiKey = e.parameter.apiKey;
  const validApiKey = 'DIN_HEMMELIGE_NØKKEL';
  
  if (apiKey !== validApiKey) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Unauthorized'}))
      .setMimeType(ContentService.MimeType.JSON);
  }
  
  // ... resten av koden
}
```

Og i `src/app/api/contact/route.ts`, legg til:
```typescript
body: JSON.stringify({
  ...formData,
  apiKey: process.env.GOOGLE_SCRIPT_API_KEY,
}),
```

