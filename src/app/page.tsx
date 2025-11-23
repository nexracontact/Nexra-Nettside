import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import CaseStudies from '@/components/sections/CaseStudies'
import Pricing from '@/components/sections/Pricing'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'
import BackgroundParticles from '@/components/ui/BackgroundParticles'
import BookingModal from '@/components/ui/BookingModal'

export default function Home() {
  return (
    <>
      <BackgroundParticles />
      <Hero />
      <Services />
      <Portfolio />
      <CaseStudies />
      <Pricing />
      <About />
      <Contact />
      <BookingModal />
    </>
  )
}

