'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import CTAButton from '@/components/ui/CTAButton'

export default function Hero() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Second orb moves in opposite direction
  const mouseX2 = useMotionValue(0)
  const mouseY2 = useMotionValue(0)
  const x2 = useSpring(mouseX2, springConfig)
  const y2 = useSpring(mouseY2, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Normalize mouse position to -1 to 1
      const normalizedX = (clientX / innerWidth) * 2 - 1
      const normalizedY = (clientY / innerHeight) * 2 - 1
      
      // Set motion values with parallax effect
      mouseX.set(normalizedX * 50)
      mouseY.set(normalizedY * 50)
      
      // Second orb moves in opposite direction
      mouseX2.set(-normalizedX * 30)
      mouseY2.set(-normalizedY * 30)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, mouseX2, mouseY2])

  const openBookingModal = () => {
    const modal = document.getElementById('booking-modal')
    if (modal) {
      modal.style.display = 'flex'
      document.body.style.overflow = 'hidden'
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple bg-clip-text text-transparent">
              Nexra
            </span>
            <br />
            <span className="text-white">Profesjonelle nettsider med AI-automasjon</span>
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Vi lager moderne, konverteringsfokuserte nettsider med valgfri AI-automasjon som tilleggstjeneste.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 justify-center items-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <CTAButton
              text="Book gratis møte"
              variant="primary"
              onClick={openBookingModal}
              className="w-full sm:w-auto"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient orbs with parallax */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-blue/25 rounded-full blur-3xl -z-10 animate-pulse-slow"
        style={{
          x: x,
          y: y,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl -z-10 animate-pulse-slow"
        style={{
          x: x2,
          y: y2,
          animationDelay: '1s',
        }}
      />
    </section>
  )
}

