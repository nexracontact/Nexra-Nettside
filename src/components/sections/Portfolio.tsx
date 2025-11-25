'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import Image from 'next/image'
import CTAButton from '@/components/ui/CTAButton'
import ProjectModal from '@/components/ui/ProjectModal'

interface Project {
  id: string
  title: string
  description: string
  fullDescription?: string
  image: string
  images?: string[]
  category: string
  link?: string
  technologies?: string[]
  results?: string[]
  video?: {
    youtubeId?: string
    vimeoId?: string
    src?: string
    poster?: string
  }
}

// Legg til dine prosjekter her
// Bildene skal ligge i public/images/portfolio/
const projects: Project[] = [
  {
    id: '1',
    title: 'Prosjekt 1',
    description: 'Kort beskrivelse av prosjektet.',
    fullDescription: 'Dette er en lengre beskrivelse av prosjektet. Her kan du skrive mer detaljert om hva som ble bygget, utfordringene som ble løst, og hvordan løsningen fungerer. Du kan også inkludere informasjon om prosessen og samarbeidet med kunden.',
    image: '/images/portfolio/prosjekt1.jpg',
    images: ['/images/portfolio/prosjekt1-2.jpg', '/images/portfolio/prosjekt1-3.jpg'], // Valgfritt: flere bilder
    category: 'Nettside',
    link: 'https://panorama-bowling-molde-e23b1e.webflow.io/',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    results: [
      'Økt konvertering med 40%',
      'Redusert laste tid med 60%',
      'Forbedret brukeropplevelse betydelig',
    ],
    video: {
      src: '/videos/Nexra Chatbot Video.mp4',
      poster: '/images/portfolio/prosjekt1.jpg',
    },
  },
  {
    id: '2',
    title: 'Prosjekt 2',
    description: 'Kort beskrivelse av prosjektet.',
    fullDescription: 'Dette er en lengre beskrivelse av prosjektet. Her kan du skrive mer detaljert om hva som ble bygget, utfordringene som ble løst, og hvordan løsningen fungerer.',
    image: '/images/portfolio/prosjekt2.jpg',
    category: 'Nettside + AI',
    link: 'https://eksempel.no',
    technologies: ['Next.js', 'AI Chatbot', 'OpenAI'],
    results: [
      'Automatisert 80% av kundeservice',
      'Redusert svartid fra timer til sekunder',
    ],
  },
  {
    id: '3',
    title: 'Prosjekt 3',
    description: 'Kort beskrivelse av prosjektet.',
    fullDescription: 'Dette er en lengre beskrivelse av prosjektet. Her kan du skrive mer detaljert om hva som ble bygget.',
    image: '/images/portfolio/prosjekt3.jpg',
    category: 'Webapplikasjon',
    link: 'https://eksempel.no',
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    results: [
      'Skalerbar løsning for 10,000+ brukere',
      'Forbedret produktivitet med 50%',
    ],
  },
  // Legg til flere prosjekter her...
]

export default function Portfolio() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const openBookingModal = () => {
    const modal = document.getElementById('booking-modal')
    if (modal) {
      modal.style.display = 'flex'
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <section id="vaart-arbeid" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Vårt arbeid
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Se eksempler på nettsider og løsninger vi har bygget for våre kunder.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleProjectClick(project)}
              className="glass rounded-2xl overflow-hidden hover:border-neon-cyan/50 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Legg til bilde</span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-card/80 backdrop-blur-sm text-neon-cyan border border-neon-cyan/30">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                <span className="text-neon-cyan text-sm font-medium inline-flex items-center gap-2">
                  Les mer
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <CTAButton
            text="Se alle prosjekter"
            variant="secondary"
            href="#vaart-arbeid"
            onClick={openBookingModal}
          />
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

