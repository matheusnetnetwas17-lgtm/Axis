'use client'

import { useEffect, useState, type ComponentPropsWithoutRef } from 'react'
import { motion } from 'motion/react'
import {
  cardHover,
  cardTap,
  containerVariants,
  itemVariants,
  statVariants,
} from '@/lib/motion-variants'

/** Detects a real mouse so hover microinteractions never fire on touch. */
function useCanHover() {
  const [canHover, setCanHover] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setCanHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return canHover
}

type StaggerProps = ComponentPropsWithoutRef<typeof motion.div> & {
  as?: 'div' | 'section' | 'ul'
  /** viewport intersection amount (0-1) */
  amount?: number
}

/**
 * Container that reveals its <MotionItem> children with a discreet stagger
 * the first time it scrolls into view.
 */
export function MotionStagger({
  as = 'div',
  amount = 0.2,
  children,
  ...props
}: StaggerProps) {
  const Comp = motion[as]
  return (
    <Comp
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...props}
    >
      {children}
    </Comp>
  )
}

type ItemProps = ComponentPropsWithoutRef<typeof motion.div> & {
  as?: 'div' | 'article' | 'li'
  /** stat = tighter entrance (numbers). */
  variant?: 'item' | 'stat'
  /** adds a premium hover lift on mouse devices only. */
  interactive?: boolean
}

/** A single staggered child. Owns its own transform/opacity (no GSAP here). */
export function MotionItem({
  as = 'div',
  variant = 'item',
  interactive = false,
  children,
  ...props
}: ItemProps) {
  const canHover = useCanHover()
  const Comp = motion[as]
  const hoverProps =
    interactive && canHover ? { whileHover: cardHover, whileTap: cardTap } : {}

  return (
    <Comp
      variants={variant === 'stat' ? statVariants : itemVariants}
      {...hoverProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
