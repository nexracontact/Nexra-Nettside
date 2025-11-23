'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
}: AnimatedCounterProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })
  const countRef = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current || !countRef.current) return

    hasAnimated.current = true
    const start = 0
    const end = value
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(start + (end - start) * easeOut)

      if (countRef.current) {
        countRef.current.textContent = `${prefix}${current}${suffix}`
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else if (countRef.current) {
        countRef.current.textContent = `${prefix}${end}${suffix}`
      }
    }

    animate()
  }, [inView, value, suffix, prefix, duration])

  return (
    <span ref={ref} className={className}>
      <span ref={countRef}>{prefix}0{suffix}</span>
    </span>
  )
}


