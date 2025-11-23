'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  bio: string
  image?: string
}

const teamMembers: TeamMember[] = [
  {
    name: 'Fredrik Nerlandsrem',
    role: 'Founder • AI Engineer • Fullstack Developer',
    bio: 'Spesialist på AI-teknologi og fullstack-utvikling. Bygger intelligente løsninger som kombinerer moderne webteknologi med avansert AI.',
    // image: '/images/team/fredrik.jpg', // Legg til bildet når det er klart
  },
  {
    name: 'Emil Silseth',
    role: 'Founder • UI/UX Designer',
    bio: 'Skaper intuitive og visuelt tiltalende brukeropplevelser. Fokuserer på design som konverterer og engasjerer brukere.',
    image: '/images/team/IMG_0453-facebook.jpg',
  },
  {
    name: 'Mats Åbelvold',
    role: 'Founder • Customer Success Manager',
    bio: 'Sikrer at kundene får maksimal verdi av løsningene våre. Fokuserer på langvarige partnerskap og kundetilfredshet.',
    image: '/images/team/Mats.jpg',
  },
]

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="om-oss" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-dark-surface/30">
      <div className="max-w-7xl mx-auto">
        {/* Mission & Vision */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-6">
            Om Nexra
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-300 leading-relaxed">
            <p>
              Nexra spesialiserer seg på å lage profesjonelle, moderne nettsider som konverterer besøkende til kunder. Vi bygger nettsider med fokus på brukeropplevelse, ytelse og resultater.
            </p>
            <p>
              Vi tilbyr også AI-automasjon som tilleggstjeneste. Dette inkluderer chatbots, automatiserte prosesser og smarte systemer som kan øke effektiviteten og forbedre kundeopplevelsen.
            </p>
            <p className="text-xl font-semibold text-neon-cyan">
              Nexra bygger nettsider som virker – med mulighet for AI-automasjon.
            </p>
          </div>
        </motion.div>

        {/* Team Section */}
        <div>
          <motion.h3
            className="text-3xl font-heading font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Teamet vårt
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center hover:border-neon-purple/50 transition-all duration-300 cursor-pointer group"
              >
                {member.image ? (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-neon-blue/50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
                <h4 className="text-xl font-heading font-semibold text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-neon-cyan text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

