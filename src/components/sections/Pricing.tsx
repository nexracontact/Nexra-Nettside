'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/ui/CTAButton'

interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  cta: string
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    price: '15 000',
    description: 'Perfekt for små bedrifter som trenger en profesjonell nettside',
    features: [
      'Moderne, responsiv nettside',
      'Opptil 5 sider',
      'Kontaktskjema og booking',
      'SEO-optimalisering',
      'Mobiloptimalisert',
      'Grunnleggende support',
      'AI-automasjon kan legges til (tillegg)',
    ],
    cta: 'Book gratis møte',
  },
  {
    name: 'Growth',
    price: '35 000',
    description: 'For vekstbedrifter som trenger en kraftig nettside med AI-automasjon',
    features: [
      'Alt i Starter, pluss:',
      'Opptil 15 sider',
      'AI-chatbot for kundeservice',
      'Automatiserte salgsfunneller',
      'Integrasjon med CRM og markedsføringstools',
      'Avansert SEO og konverteringsoptimalisering',
      'Prioritert support og oppfølging',
    ],
    popular: true,
    cta: 'Snakk med en ekspert nå',
  },
  {
    name: 'Enterprise',
    price: 'Kontakt oss',
    description: 'Komplett løsning for store bedrifter med avanserte behov',
    features: [
      'Alt i Growth, pluss:',
      'Ubegrenset antall sider',
      'Tilpasset webapplikasjon',
      'Fullstendig AI-automasjon',
      'Tilpassede AI-modeller og chatbots',
      'Dedikert team av eksperter',
      '24/7 support og monitoring',
      'Kontinuerlig forbedring og optimalisering',
    ],
    cta: 'Få en tilbud',
  },
]

export default function Pricing() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const openBookingModal = () => {
    const modal = document.getElementById('booking-modal')
    if (modal) {
      modal.style.display = 'flex'
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <section id="priser" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Velg din nettsidepakke
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Alle pakker inkluderer profesjonell nettside. AI-automasjon tilbys som valgfri tilleggstjeneste.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass rounded-2xl p-8 relative ${
                tier.popular
                  ? 'border-2 border-neon-cyan/50 neon-glow-cyan scale-105 md:scale-110'
                  : 'hover:border-neon-blue/50'
              } transition-all duration-300`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-neon-blue to-neon-purple text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Mest populær
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-heading font-bold mb-2 text-white">{tier.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-heading font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
                  {tier.price}
                </span>
                {tier.price !== 'Kontakt oss' && (
                  <span className="text-gray-400 text-sm ml-2">kr/mnd</span>
                )}
              </div>
              <p className="text-gray-300 mb-6 text-sm">{tier.description}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-neon-cyan mr-2 mt-1">✓</span>
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <CTAButton
                text={tier.cta}
                variant={tier.popular ? 'primary' : 'secondary'}
                onClick={openBookingModal}
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

