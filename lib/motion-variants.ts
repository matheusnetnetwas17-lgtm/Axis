import type { Variants } from 'motion/react'

/**
 * Shared Motion variants for the AXIS IMPULSE site.
 * Premium, scientific tone: smooth, quick, discreet -- no bounce.
 * Animations are always on: <MotionProvider> sets reducedMotion="never", so
 * these variants play regardless of the OS "reduce motion" setting.
 */

const easeOutExpo = [0.22, 1, 0.36, 1] as const

/** Container that staggers its direct [variants] children. */
export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Standard card / block entrance. */
export const itemVariants: Variants = {
  hidden: { y: 24, opacity: 0, filter: 'blur(5px)' },
  show: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.65, ease: easeOutExpo },
  },
}

/** Slightly tighter entrance for stats / numbers. */
export const statVariants: Variants = {
  hidden: { y: 16, opacity: 0, scale: 0.97 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
}

/** Premium, non-clickable-feeling hover for cards (desktop only via Motion). */
export const cardHover = {
  y: -3,
  scale: 1.008,
  transition: { duration: 0.22, ease: 'easeOut' as const },
}

export const cardTap = { scale: 0.99 }
