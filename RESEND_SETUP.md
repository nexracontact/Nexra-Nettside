# Guide: Sett opp Resend for kontaktformular

Resend er en enkel og pålitelig e-post-tjeneste. Gratis tier: 3000 e-poster/måned.

## Steg 1: Opprett Resend-konto

1. Gå til [resend.com](https://resend.com)
2. Klikk "Sign Up" og opprett gratis konto
3. Verifiser e-posten din

## Steg 2: Hent API-nøkkel

1. Etter innlogging, gå til [API Keys](https://resend.com/api-keys)
2. Klikk "Create API Key"
3. Gi den et navn (f.eks. "Nexra Website")
4. Kopier API-nøkkelen (du ser den bare én gang!)

## Steg 3: Legg til i Vercel

1. Gå til Vercel Dashboard → Ditt prosjekt → Settings → Environment Variables
2. Klikk "Add New"
3. Fyll ut:
   - **Name:** `RESEND_API_KEY`
   - **Value:** Lim inn API-nøkkelen du kopierte
   - **Environments:** Velg alle (Production, Preview, Development)
4. Klikk "Save"

## Steg 4: Redeploy

Etter at du har lagt til environment variable, må du redeploy:

```bash
git commit --allow-empty -m "Add Resend email integration"
git push
```

Eller gå til Vercel Dashboard → Deployments → Klikk på de tre prikkene → "Redeploy"

## Steg 5: Test

1. Fyll ut kontaktformularet på nettsiden
2. Sjekk at du får suksessmelding
3. Sjekk innboksen til `nexracontact@gmail.com` - du skal få en e-post!

## Verifiser egen domene (valgfritt)

For å bruke din egen e-postadresse (f.eks. `kontakt@nexra.no` i stedet for `onboarding@resend.dev`):

1. Gå til Resend Dashboard → Domains
2. Klikk "Add Domain"
3. Legg til domenet ditt (f.eks. `nexra.no`)
4. Legg til DNS-poster som Resend gir deg
5. Vent på verifisering (kan ta noen timer)
6. Oppdater `from` i `src/app/api/contact/route.ts` til din e-postadresse

## Feilsøking

**E-post kommer ikke frem:**
- Sjekk at `RESEND_API_KEY` er riktig lagt til i Vercel
- Sjekk at du har redeployet etter å ha lagt til environment variable
- Sjekk Resend Dashboard → Logs for å se om e-posten ble sendt
- Sjekk spam-mappen

**"RESEND_API_KEY is not set" feil:**
- Sjekk at environment variable navnet er nøyaktig `RESEND_API_KEY` (stor bokstav)
- Sjekk at du har redeployet

## Fordeler med Resend

✅ Enkelt å sette opp (5 minutter)
✅ Gratis tier: 3000 e-poster/måned
✅ Rask levering
✅ God deliverability
✅ Dashboard for å se alle e-poster
✅ Ingen database nødvendig - alt sendes direkte til e-post






