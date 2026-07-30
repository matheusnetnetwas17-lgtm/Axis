import type { PointerEvent } from 'react'

/**
 * Updates the CSS custom properties that position the local spotlight gradient.
 * Uses direct style writes (no React state) so it never triggers re-renders on
 * pointer move. Pair with the `.spotlight-surface` class in globals.css, which
 * only activates on `(hover: hover) and (pointer: fine)` devices.
 */
export function handleSpotlightMove(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spotlight-x', `${event.clientX - rect.left}px`)
  el.style.setProperty('--spotlight-y', `${event.clientY - rect.top}px`)
}
