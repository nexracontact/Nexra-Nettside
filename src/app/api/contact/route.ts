import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Sjekk om Resend API key er satt
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { 
          error: 'E-post-tjeneste er ikke konfigurert. Send e-post til nexracontact@gmail.com',
        },
        { status: 500 }
      )
    }

    // Send e-post via Resend
    try {
      const emailContent = `
Ny henvendelse fra kontaktformularet:

Navn: ${name}
E-post: ${email}
Selskap: ${company || 'Ikke oppgitt'}
Antall ansatte: ${employees || 'Ikke oppgitt'}
Tjeneste: ${service || 'Ikke oppgitt'}

Melding:
${message}

---
Sendt: ${new Date().toLocaleString('no-NO')}
      `.trim()

      await resend.emails.send({
        from: 'Nexra Kontaktformular <onboarding@resend.dev>', // Endre til din verifiserte domene senere
        to: 'nexracontact@gmail.com',
        replyTo: email,
        subject: `Ny henvendelse fra ${name}${company ? ` - ${company}` : ''}`,
        text: emailContent,
      })

      console.log('Email sent successfully via Resend')
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      return NextResponse.json(
        { 
          error: 'Kunne ikke sende e-post. Prøv igjen eller send direkte til nexracontact@gmail.com',
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Melding mottatt! Vi tar kontakt snart.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { 
        error: 'Noe gikk galt. Prøv igjen eller send e-post til nexracontact@gmail.com',
      },
      { status: 500 }
    )
  }
}

