'use client'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

type CtaButtonProps = {
  children: React.ReactNode
  className?: string
  showArrow?: boolean
}

export function CtaButton({ children, className, showArrow = true }: CtaButtonProps) {
  return (
    <motion.button
      type="button"
      // Motion owns the lift transform; whileTap gives touch feedback.
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={cn(
        'group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-primary/60 bg-gradient-to-b from-[#4d9aff] to-primary px-10 py-4 text-sm font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0_22px_rgba(47,125,255,0.28),inset_0_1px_0_rgba(255,255,255,0.18)] transition-shadow duration-200 hover:shadow-[0_0_40px_rgba(47,125,255,0.5),inset_0_1px_0_rgba(255,255,255,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-14 md:py-5 md:text-base',
        className,
      )}
    >
      {/* shine sweep on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full"
      />
      {children}
      {showArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </motion.button>
  )
}
