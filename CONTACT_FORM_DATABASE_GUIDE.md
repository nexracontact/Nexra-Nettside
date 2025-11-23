# Guide: Koble kontaktformular til database

## Metode 1: Vercel Serverless Functions + Supabase (Anbefalt - Gratis tier)

Supabase er en Firebase-alternativ med PostgreSQL-database.

### Steg 1: Opprett Supabase-prosjekt
1. Gå til [supabase.com](https://supabase.com)
2. Opprett gratis konto
3. Opprett nytt prosjekt
4. Gå til "SQL Editor" og kjør:

```sql
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  employees TEXT,
  message TEXT NOT NULL,
  service TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Steg 2: Installer Supabase
```bash
npm install @supabase/supabase-js
```

### Steg 3: Opprett API route
Opprett `src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, employees, message, service } = body

    // Validering
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Navn, e-post og melding er påkrevd' },
        { status: 400 }
      )
    }

    // Lagre i database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          company: company || null,
          employees: employees || null,
          message,
          service: service || null,
        },
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Kunne ikke lagre melding' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Noe gikk galt' },
      { status: 500 }
    )
  }
}
```

### Steg 4: Legg til miljøvariabler
Opprett `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=din-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=din-supabase-anon-key
```

Legg til i Vercel Dashboard → Settings → Environment Variables

### Steg 5: Oppdater BookingModal
I `src/components/ui/BookingModal.tsx`, endre `handleSubmit`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const newErrors: Partial<FormData> = {}

  if (!formData.name.trim()) {
    newErrors.name = 'Navn er påkrevd'
  }
  if (!formData.email.trim()) {
    newErrors.email = 'E-post er påkrevd'
  } else if (!validateEmail(formData.email)) {
    newErrors.email = 'Ugyldig e-postadresse'
  }
  if (!formData.message.trim()) {
    newErrors.message = 'Melding er påkrevd'
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors)
    return
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Noe gikk galt')
    }

    // Suksess!
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      company: '',
      employees: '',
      message: '',
      service: '',
    })
  } catch (error) {
    console.error('Error:', error)
    alert('Kunne ikke sende melding. Prøv igjen.')
  }
}
```

---

## Metode 2: Formspree (Enklest - Ingen backend-kode)

### Steg 1: Opprett konto
1. Gå til [formspree.io](https://formspree.io)
2. Opprett gratis konto
3. Opprett nytt skjema
4. Kopier form ID (f.eks. `xqkzpqyz`)

### Steg 2: Oppdater BookingModal
Endre form action:

```tsx
<form 
  action="https://formspree.io/f/xqkzpqyz" 
  method="POST"
  onSubmit={handleSubmit}
>
  {/* ... eksisterende felter ... */}
</form>
```

Formspree sender automatisk e-post og kan lagre i deres dashboard.

---

## Metode 3: Google Sheets (Enkel database)

### Steg 1: Opprett Google Sheet
1. Opprett nytt Google Sheet
2. Legg til kolonner: Navn, E-post, Selskap, Ansatte, Melding, Tjeneste, Dato

### Steg 2: Bruk Google Apps Script
1. I Google Sheets: Extensions → Apps Script
2. Lim inn:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.company || '',
    data.employees || '',
    data.message,
    data.service || ''
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy som Web App
4. Kopier Web App URL

### Steg 3: Oppdater BookingModal
```typescript
const response = await fetch('DIN_GOOGLE_APPS_SCRIPT_URL', {
  method: 'POST',
  body: JSON.stringify(formData),
})
```

---

## Metode 4: SendGrid + E-post (Enkel løsning)

### Steg 1: Installer SendGrid
```bash
npm install @sendgrid/mail
```

### Steg 2: Opprett API route
`src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, message, service } = body

    const msg = {
      to: 'nexracontact@gmail.com',
      from: 'noreply@nexra.no',
      subject: `Ny kontakt fra ${name}`,
      html: `
        <h2>Ny kontaktforespørsel</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Selskap:</strong> ${company || 'Ikke oppgitt'}</p>
        <p><strong>Tjeneste:</strong> ${service || 'Ikke oppgitt'}</p>
        <p><strong>Melding:</strong></p>
        <p>${message}</p>
      `,
    }

    await sgMail.send(msg)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke sende e-post' },
      { status: 500 }
    )
  }
}
```

---

## Metode 5: MongoDB Atlas (Gratis tier)

### Steg 1: Opprett MongoDB Atlas
1. Gå til [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Opprett gratis konto
3. Opprett cluster
4. Kopier connection string

### Steg 2: Installer MongoDB
```bash
npm install mongodb
```

### Steg 3: Opprett API route
`src/app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI!
const client = new MongoClient(uri)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await client.connect()
    
    const db = client.db('nexra')
    const collection = db.collection('contacts')
    
    await collection.insertOne({
      ...body,
      createdAt: new Date(),
    })
    
    await client.close()
    
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Kunne ikke lagre' },
      { status: 500 }
    )
  }
}
```

---

## Anbefalinger

### For enkel løsning:
- **Formspree** - Ingen backend-kode, sender e-post automatisk

### For database:
- **Supabase** - Gratis, enkel, PostgreSQL
- **MongoDB Atlas** - Gratis tier, fleksibel

### For e-post:
- **SendGrid** - 100 gratis e-poster/dag
- **Resend** - Moderne alternativ

---

## Sikkerhet

1. **Rate limiting** - Begrens antall innsendinger
2. **reCAPTCHA** - Forhindre spam
3. **Validering** - Både frontend og backend
4. **Sanitize input** - Forhindre XSS-angrep

---

## Eksempel med reCAPTCHA

```bash
npm install react-google-recaptcha
```

Legg til i form:
```tsx
import ReCAPTCHA from 'react-google-recaptcha'

const [captchaValue, setCaptchaValue] = useState<string | null>(null)

<ReCAPTCHA
  sitekey="DIN_SITE_KEY"
  onChange={setCaptchaValue}
/>
```

---

## Hvilken metode skal du bruke?

- **Raskest:** Formspree
- **Best for database:** Supabase
- **Enklest å sette opp:** Google Sheets
- **Profesjonelt:** Supabase eller MongoDB

Si fra hvilken metode du vil bruke, så kan jeg hjelpe deg med implementeringen!

