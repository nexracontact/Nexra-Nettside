import { NextRequest, NextResponse } from 'next/server'

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

    // Hent Google Apps Script Web App URL fra miljøvariabel
    const googleScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL

    if (!googleScriptUrl) {
      console.error('GOOGLE_APPS_SCRIPT_URL is not set')
      return NextResponse.json(
        { error: 'Server konfigurasjon mangler' },
        { status: 500 }
      )
    }

    // Send data til Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company: company || '',
        employees: employees || '',
        message,
        service: service || '',
        timestamp: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Google Apps Script error:', errorText)
      throw new Error(`Kunne ikke lagre i Google Sheets: ${response.status}`)
    }

    let result
    try {
      result = await response.json()
    } catch (e) {
      // Hvis response ikke er JSON, prøv som tekst
      const text = await response.text()
      result = { success: true, message: text }
    }

    return NextResponse.json(
      { success: true, data: result },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error saving to Google Sheets:', error)
    return NextResponse.json(
      { error: 'Kunne ikke lagre melding. Prøv igjen senere.' },
      { status: 500 }
    )
  }
}

