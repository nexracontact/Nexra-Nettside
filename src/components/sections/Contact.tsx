'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CTAButton from '@/components/ui/CTAButton'

export default function Contact() {
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
    <section id="kontakt" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-heading font-bold mb-4">
            Klar for å automatisere?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ta første steg mot mer tid, mindre arbeid og større vekst. Book et gratis møte eller få en AI-analyse av bedriften din.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <CTAButton
              text="Book gratis møte"
              variant="primary"
              onClick={openBookingModal}
              className="w-full sm:w-auto"
            />
            <CTAButton
              text="Få en AI-analyse av bedriften"
              variant="secondary"
              onClick={openBookingModal}
              className="w-full sm:w-auto"
            />
          </div>

          <div className="text-center text-gray-400 text-sm">
            <p>Eller send oss en melding direkte:</p>
            <p className="mt-2">
              <a href="mailto:nexracontact@gmail.com" className="text-neon-cyan hover:underline">
                nexracontact@gmail.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

