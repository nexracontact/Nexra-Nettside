'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import VideoPlayer from '@/components/ui/VideoPlayer'

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

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!project || !isOpen) return null

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative glass-strong rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white transition-colors p-2 hover:bg-dark-card/50 rounded-full"
            aria-label="Lukk"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main image or video */}
          <div className="relative w-full overflow-hidden rounded-t-2xl">
            {project.video ? (
              <div className="relative">
                <VideoPlayer
                  youtubeId={project.video.youtubeId}
                  vimeoId={project.video.vimeoId}
                  src={project.video.src}
                  poster={project.video.poster || project.image}
                  controls={true}
                  className="rounded-t-2xl"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-card/80 backdrop-blur-sm text-neon-cyan border border-neon-cyan/30">
                    {project.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="relative h-64 md:h-96 w-full">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <span className="text-gray-400">Ingen bilde</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-card/80 backdrop-blur-sm text-neon-cyan border border-neon-cyan/30">
                    {project.category}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {project.title}
            </h2>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Additional images */}
            {project.images && project.images.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-heading font-semibold text-white mb-4">Flere bilder</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.images.map((img, index) => (
                    <div key={index} className="relative h-48 w-full rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`${project.title} - Bilde ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-heading font-semibold text-white mb-3">Teknologier</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm bg-neon-blue/20 text-neon-cyan border border-neon-blue/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-heading font-semibold text-white mb-3">Resultater</h3>
                <ul className="space-y-2">
                  {project.results.map((result, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <span className="text-neon-cyan mr-2 mt-1">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Link */}
            {project.link && project.link !== '#' && (
              <div className="pt-6 border-t border-white/10">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-medium hover:shadow-neon-blue hover:scale-105 transition-all duration-300"
                >
                  Besøk nettsiden
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}


