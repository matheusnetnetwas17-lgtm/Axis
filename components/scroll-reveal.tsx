'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** initial vertical offset in px */
  y?: number
  as?: 'div' | 'section' | 'li' | 'article'
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Animations always on (product decision): do not short-circuit on the OS
    // reduce-motion setting; always run the intersection-based reveal.
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as 'div'
  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        filter: visible ? 'blur(0px)' : 'blur(5px)',
        transition: `opacity 0.8s ${ease} ${delay}s, transform 0.8s ${ease} ${delay}s, filter 0.8s ${ease} ${delay}s`,
        willChange: visible ? undefined : 'opacity, transform, filter',
      }}
    >
      {children}
    </Tag>
  )
}
