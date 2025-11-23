'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from '@/components/ui/CTAButton'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Tjenester', href: '#tjenester' },
    { label: 'Vårt arbeid', href: '#vaart-arbeid' },
    { label: 'Priser', href: '#priser' },
    { label: 'Om oss', href: '#om-oss' },
    { label: 'Kontakt', href: '#kontakt' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="text-2xl font-heading font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Nexra
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            <CTAButton
              text="Book gratis møte"
              variant="primary"
              onClick={() => {
                const modal = document.getElementById('booking-modal')
                if (modal) {
                  modal.style.display = 'flex'
                  document.body.style.overflow = 'hidden'
                }
              }}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 pb-4"
            >
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <CTAButton
                text="Book gratis møte"
                variant="primary"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  const modal = document.getElementById('booking-modal')
                  if (modal) {
                    modal.style.display = 'flex'
                    document.body.style.overflow = 'hidden'
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

