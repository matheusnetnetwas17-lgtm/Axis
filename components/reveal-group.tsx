'use client'

import { useRef, type ReactNode } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface RevealGroupProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'header' | 'article'
  /** ScrollTrigger start position */
  start?: string
}

/**
 * Reveals descendants marked with [data-reveal] line by line as the group
 * enters the viewport. One timeline + one ScrollTrigger per group.
 * Plays once per visit. Fully skipped under prefers-reduced-motion.
 */
export function RevealGroup({
  children,
  className,
  as = 'div',
  start = 'top 84%',
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return
      const lines = gsap.utils.toArray<HTMLElement>('[data-reveal]', root)
      if (!lines.length) return

      const mm = gsap.matchMedia()

      // Animations always on (product decision): run regardless of the OS
      // reduce-motion setting.
      mm.add('all', () => {
        gsap.fromTo(
          lines,
          { y: 32, autoAlpha: 0, filter: 'blur(6px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            clearProps: 'filter',
            scrollTrigger: {
              trigger: root,
              start,
              toggleActions: 'play none none none',
              once: true,
            },
          },
        )
      })
      // Under reduced motion nothing runs: content stays visible by default.
    },
    { scope: ref },
  )

  const Tag = as as 'div'
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
