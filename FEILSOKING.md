# Feilsøking: Kontaktformular fungerer ikke

## Sjekkliste

### 1. Er Environment Variable satt i Vercel?

1. Gå til [Vercel Dashboard](https://vercel.com/dashboard)
2. Klikk på prosjektet "nexra-nettside"
3. Gå til **Settings** → **Environment Variables**
4. Sjekk at `GOOGLE_APPS_SCRIPT_URL` finnes
5. Hvis ikke, legg den til (se GOOGLE_SHEETS_SETUP.md Steg 4)

### 2. Er Google Apps Script satt opp?

1. Gå til [Google Apps Script](https://script.google.com)
2. Sjekk at du har opprettet et script
3. Sjekk at det er deployet som Web App
4. Sjekk at "Who has access" er satt til **"Anyone"**
5. Kopier Web App URL og sjekk at den er riktig i Vercel

### 3. Test Google Apps Script direkte

Åpne denne URL-en i nettleseren (erstatt med din URL):
```
https://script.google.com/macros/s/DIN_SCRIPT_ID/exec
```

Du skal få en respons (kan være en feil, men det betyr at scriptet svarer).

### 4. Sjekk Vercel Logs

1. Gå til Vercel Dashboard → Prosjektet ditt
2. Klikk på **Deployments**
3. Klikk på siste deployment
4. Klikk på **Functions** tab
5. Se etter `/api/contact` og klikk på den
6. Se logs for feilmeldinger

### 5. Test API direkte

Åpne nettleserens Developer Tools (F12):
1. Gå til **Network** tab
2. Fyll ut og send skjemaet
3. Se etter `/api/contact` request
4. Klikk på den og se **Response** for feilmeldinger

## Vanlige feil

### Feil: "GOOGLE_APPS_SCRIPT_URL is not set"
**Løsning:** Legg til environment variable i Vercel

### Feil: "CORS error" eller "Network error"
**Løsning:** 
- Sjekk at Google Apps Script Web App er deployet
- Sjekk at "Who has access" er "Anyone"
- Prøv å redeploye Google Apps Script

### Feil: "Script function not found"
**Løsning:**
- Sjekk at funksjonen heter `doPost` i Google Apps Script
- Sjekk at scriptet er deployet som Web App

### Feil: "Permission denied"
**Løsning:**
- Sjekk at du har godkjent alle autorisasjoner i Google Apps Script
- Gå til Apps Script → Review permissions → Allow

## Test uten Google Sheets (temporær løsning)

Hvis du vil teste at resten fungerer, kan du midlertidig endre API-en til å bare returnere suksess:

I `src/app/api/contact/route.ts`, kommenter ut Google Sheets-delen:

```typescript
// Midlertidig: Returner suksess uten å lagre
return NextResponse.json(
  { success: true, message: 'Test mode - data not saved' },
  { status: 200 }
)

// Kommenter ut resten:
/*
const googleScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
...
*/
```

Dette lar deg teste at skjemaet fungerer, mens du setter opp Google Sheets.

## Hjelp

Hvis ingenting fungerer, sjekk:
1. Vercel deployment logs
2. Browser console (F12)
3. Network tab i browser
4. Google Apps Script execution logs

