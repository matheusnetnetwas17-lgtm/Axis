type SectionAtmosphereProps = {
  /** where the soft glow sits vertically within the section */
  glowPosition?: 'top' | 'center' | 'bottom'
  /** flip the horizontal bias of the glow */
  flip?: boolean
  /** kept for API compatibility; ambient particles are now global */
  particles?: boolean
}

/**
 * Per-section emphasis glow.
 *
 * Intentionally minimal: a single, very soft, wide radial that blends into the
 * global SiteBackground so sections read as one continuous environment (no hard
 * edges, bands, or per-section color patches). Parent must be
 * `relative overflow-hidden`.
 */
export function SectionAtmosphere({
  glowPosition = 'top',
  flip = false,
}: SectionAtmosphereProps) {
  const top =
    glowPosition === 'top' ? '-8%' : glowPosition === 'center' ? '28%' : '58%'

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <div
        className="absolute h-[520px] w-[900px] max-w-[130vw] rounded-full blur-2xl"
        style={{
          top,
          left: flip ? '58%' : '42%',
          transform: 'translateX(-50%)',
          background:
            'radial-gradient(circle, rgba(47,125,255,0.08) 0%, rgba(47,125,255,0.025) 42%, transparent 68%)',
        }}
      />
    </div>
  )
}
