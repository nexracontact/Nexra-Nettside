'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Service {
  title: string
  description: string
  icon: string
}

const services: Service[] = [
  {
    title: 'Profesjonelle nettsider',
    description: 'Moderne, responsive nettsider bygget for konvertering. Fra enkle landing pages til komplekse webapplikasjoner.',
    icon: '🌐',
  },
  {
    title: 'AI-automasjon (tilleggstjeneste)',
    description: 'Legg inn AI-automasjon i nettsiden din. Chatbots, automatiserte prosesser og smarte systemer som øker effektiviteten.',
    icon: '🤖',
  },
  {
    title: 'AI-chatbots / kundeservice',
    description: '24/7 kundeservice som svarer raskt, lærer av hver samtale og eskalerer når nødvendig. Perfekt tillegg til din nettside.',
    icon: '💬',
  },
  {
    title: 'AI-markedsføring og salgsfunneller',
    description: 'Automatiser lead-generering, oppfølging og konvertering med intelligente markedsføringssystemer integrert i nettsiden.',
    icon: '📈',
  },
]

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="tjenester" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Hva Nexra bygger for deg
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Vi lager nettsider som konverterer. Med valgfri AI-automasjon som tilleggstjeneste.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-6 hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3 text-white">
                {service.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-neon-blue to-neon-purple group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

