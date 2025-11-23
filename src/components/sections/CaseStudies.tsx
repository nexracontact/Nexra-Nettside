'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import AnimatedCounter from '@/components/ui/AnimatedCounter'

interface Result {
  label: string
  value: number
  suffix: string
  description: string
}

interface Testimonial {
  name: string
  role: string
  company: string
  text: string
  image?: string
}

const results: Result[] = [
  { label: 'Økt inntekt', value: 250, suffix: '%', description: 'Gjennomsnittlig økning i konvertering' },
  { label: 'Tidsbesparelse', value: 40, suffix: ' timer/uke', description: 'Frigjort tid per ansatt' },
  { label: 'Nye leads', value: 500, suffix: '+', description: 'Månedlige kvalifiserte leads' },
  { label: 'Svartid', value: 2, suffix: ' min', description: 'Gjennomsnittlig svar på kundeforespørsler' },
]

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Hansen',
    role: 'CEO',
    company: 'TechGrowth AS',
    text: 'Nexra har transformert hvordan vi håndterer kundeservice. Vi sparer 30 timer i uken og kundene våre er mer fornøyde enn noen gang.',
  },
  {
    name: 'Marius Olsen',
    role: 'Markedsføringssjef',
    company: 'InnovateNow',
    text: 'AI-automatiseringen vår har økt lead-genereringen med over 400%. Dette er fremtiden, og Nexra leverer.',
  },
  {
    name: 'Emma Berg',
    role: 'Operasjonsdirektør',
    company: 'ScaleUp Solutions',
    text: 'Workflow-integrasjonene har eliminert manuelt arbeid i våre prosesser. Vi kan nå fokusere på vekst i stedet for rutiner.',
  },
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
              key={result.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-2xl p-8 text-center hover:border-neon-cyan/50 transition-all duration-300"
            >
              <div className="text-5xl font-heading font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent mb-2">
                <AnimatedCounter value={result.value} suffix={result.suffix} />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{result.label}</h3>
              <p className="text-sm text-gray-400">{result.description}</p>
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

        {/* Testimonials */}
        <div>
          <motion.h3
            className="text-3xl font-heading font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Hva kundene våre sier
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="glass rounded-2xl p-6 hover:border-neon-purple/50 transition-all duration-300"
              >
                <p className="text-gray-300 mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


