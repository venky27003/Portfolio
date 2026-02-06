'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type FloatingTitleProps = {
  children: ReactNode
  className?: string
}

const FloatingTitle = ({ children, className = '' }: FloatingTitleProps) => {
  return (
    <motion.div
      className="relative inline-block"
      style={{ willChange: 'transform' }}
      initial={false}
      animate={{ y: [0, -12, 0, -8, 0], rotateZ: [0, 0.2, 0, -0.2, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
   >
      <motion.h2
        className={className}
        initial={false}
        animate={{ scale: [1, 1.01, 1, 1.005, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        {children}
      </motion.h2>

      {/* Soft ground shadow to sell levitation */}
      <motion.div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-6px] h-2 w-2/3 rounded-full bg-white/15 blur-md"
        initial={false}
        animate={{ opacity: [0.28, 0.12, 0.28, 0.16, 0.28], scaleX: [1, 0.78, 1, 0.86, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
    </motion.div>
  )
}

export default FloatingTitle


