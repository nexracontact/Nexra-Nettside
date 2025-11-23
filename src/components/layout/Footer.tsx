'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    tjenester: [
      { label: 'Profesjonelle nettsider', href: '#tjenester' },
      { label: 'AI-automasjon', href: '#tjenester' },
      { label: 'AI-chatbots', href: '#tjenester' },
      { label: 'AI-markedsføring', href: '#tjenester' },
    ],
    selskap: [
      { label: 'Om Nexra', href: '#om-oss' },
      { label: 'Vårt arbeid', href: '#vaart-arbeid' },
      { label: 'Priser', href: '#priser' },
      { label: 'Kontakt', href: '#kontakt' },
    ],
  }

  return (
    <footer className="relative border-t border-white/10 bg-dark-surface/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.h3
              className="text-2xl font-heading font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Nexra
            </motion.h3>
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              Vi lager profesjonelle, moderne nettsider med valgfri AI-automasjon som tilleggstjeneste.
            </p>
            <p className="text-gray-500 text-xs">
              © {currentYear} Nexra. Alle rettigheter reservert.
            </p>
          </div>

          {/* Tjenester */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">Tjenester</h4>
            <ul className="space-y-2">
              {footerLinks.tjenester.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Selskap */}
          <div>
            <h4 className="text-white font-heading font-semibold mb-4">Selskap</h4>
            <ul className="space-y-2">
              {footerLinks.selskap.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-neon-cyan transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

