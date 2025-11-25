'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Result {
  title: string
  description: string
}

const results: Result[] = [
  { title: 'Økt inntekt', description: 'Økt inntekt etter konvertering' },
  { title: 'Tidsbesparelse', description: 'Sparer mange timer i løpet av uken' },
  { title: 'Nye leads', description: 'Månedlige kvalifiserte leads' },
  { title: 'Svartid', description: 'Rask svar på kundeforespørsler' },
]

export default function CaseStudies() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="casestudier" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Resultater som snakker
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Nexra bygger fremtidens bedrifter. Se hva våre kunder oppnår.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {results.map((result, index) => (
            <motion.div
              key={result.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center hover:border-neon-cyan/50 transition-all duration-300"
            >
              <h3 className="text-xl font-heading font-bold text-white mb-3">{result.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{result.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          <div className="glass rounded-2xl p-8 border border-red-500/30">
            <h3 className="text-2xl font-heading font-bold text-red-400 mb-4">Før Nexra</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Manuell kundeservice 8 timer/dag</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Lead-generering via kaldeprospektering</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Repetitive oppgaver stjeler produktivitet</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                <span>Systemer som ikke snakker sammen</span>
              </li>
            </ul>
          </div>

          <div className="glass rounded-2xl p-8 border border-neon-cyan/50 neon-glow-cyan">
            <h3 className="text-2xl font-heading font-bold text-neon-cyan mb-4">Etter Nexra</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">✓</span>
                <span>AI-chatbot håndterer 80% av henvendelser automatisk</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">✓</span>
                <span>Automatisert lead-generering og oppfølging</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">✓</span>
                <span>40 timer/uke frigjort til strategisk arbeid</span>
              </li>
              <li className="flex items-start">
                <span className="text-neon-cyan mr-2">✓</span>
                <span>Seamless integrasjon mellom alle systemer</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


