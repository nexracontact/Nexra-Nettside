'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CTAButtonProps {
  text: string
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  href?: string
  icon?: ReactNode
  className?: string
}

export default function CTAButton({
  text,
  variant = 'primary',
  onClick,
  href,
  icon,
  className = '',
}: CTAButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neon-cyan focus:ring-offset-2 focus:ring-offset-dark-bg'
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:shadow-neon-blue hover:scale-105',
    secondary: 'glass border border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:scale-105',
  }

  const buttonContent = (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className} flex items-center gap-2`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      {text}
    </motion.button>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${variantClasses[variant]} ${className} inline-flex items-center gap-2`}
      >
        {icon && <span>{icon}</span>}
        {text}
      </motion.a>
    )
  }

  return buttonContent
}


