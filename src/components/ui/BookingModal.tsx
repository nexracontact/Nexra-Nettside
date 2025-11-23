'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CTAButton from './CTAButton'

interface FormData {
  name: string
  email: string
  company: string
  employees: string
  message: string
  service: string
}

export default function BookingModal() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    employees: '',
    message: '',
    service: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        employees: '',
        message: '',
        service: '',
      })
    }, 500)
  }

  const closeModal = () => {
    const modal = document.getElementById('booking-modal')
    if (modal) {
      modal.style.display = 'none'
      document.body.style.overflow = ''
    }
    setTimeout(() => {
      setIsSubmitted(false)
      setErrors({})
    }, 300)
  }

  return (
    <div
      id="booking-modal"
      className="fixed inset-0 z-50 hidden items-center justify-center p-4"
      style={{ display: 'none' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal()
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Lukk"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {!isSubmitted ? (
            <>
              <h2 className="text-3xl font-heading font-bold mb-2">Book gratis møte</h2>
              <p className="text-gray-300 mb-6">
                Fyll ut skjemaet under, så tar vi kontakt for å avtale et møte hvor vi kan diskutere hvordan Nexra kan hjelpe bedriften din.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Navn <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                    placeholder="Ditt navn"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    E-post <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                    placeholder="din@epost.no"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    Selskap
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                    placeholder="Selskapsnavn"
                  />
                </div>

                <div>
                  <label htmlFor="employees" className="block text-sm font-medium text-gray-300 mb-2">
                    Antall ansatte
                  </label>
                  <select
                    id="employees"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  >
                    <option value="">Velg antall ansatte</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                    Ønsket tjeneste/pakke
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent"
                  >
                    <option value="">Velg tjeneste</option>
                    <option value="starter">Starter</option>
                    <option value="growth">Growth</option>
                    <option value="full-automation">Full Automation</option>
                    <option value="custom">Tilpasset løsning</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Beskriv din utfordring eller behov <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-dark-surface border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:border-transparent resize-none"
                    placeholder="Fortell oss litt om hva du håper å oppnå med AI-automatisering..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium text-sm hover:shadow-neon-blue hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg"
                  >
                    Send forespørsel
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 rounded-lg glass border border-white/10 text-gray-300 hover:text-white transition-colors"
                  >
                    Avbryt
                  </button>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-heading font-bold mb-2">Takk for din forespørsel!</h3>
              <p className="text-gray-300 mb-6">
                Vi har mottatt din henvendelse og tar kontakt innen 24 timer for å avtale et møte.
              </p>
              <CTAButton
                text="Snakk med en automasjons-ekspert nå"
                variant="primary"
                onClick={closeModal}
              />
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

