import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          blue: '#6366F1',      // Indigo
          cyan: '#10B981',      // Emerald
          purple: '#8B5CF6',    // Violet
          pink: '#F43F5E',      // Rose
        },
        dark: {
          bg: '#0F0F1E',
          surface: '#1A1A2E',
          card: '#16213E',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(99, 102, 241, 0.5)',
        'neon-cyan': '0 0 20px rgba(16, 185, 129, 0.5)',
        'neon-purple': '0 0 20px rgba(139, 92, 246, 0.5)',
        'glow': '0 0 30px rgba(99, 102, 241, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

