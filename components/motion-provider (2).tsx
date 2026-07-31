'use client'

import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'

/**
 * Global Motion configuration.
 * reducedMotion="never" forces every Motion component to always animate,
 * ignoring the OS "reduce motion" setting (product decision: animations are
 * core to this experience). MotionConfig renders no DOM node.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="never">{children}</MotionConfig>
}
