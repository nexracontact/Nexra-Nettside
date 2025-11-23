import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexra – Profesjonelle nettsider med AI-automasjon',
  description: 'Vi lager moderne, konverteringsfokuserte nettsider. Vi kan også legge inn AI-automasjon hvis du ønsker det.',
  keywords: ['nettsider', 'webdesign', 'AI-automatisering', 'chatbots', 'AI-markedsføring', 'Nexra'],
  authors: [{ name: 'Nexra' }],
  openGraph: {
    title: 'Nexra – Profesjonelle nettsider med AI-automasjon',
    description: 'Vi lager moderne, konverteringsfokuserte nettsider. Vi kan også legge inn AI-automasjon hvis du ønsker det.',
    type: 'website',
    locale: 'nb_NO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="no" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

