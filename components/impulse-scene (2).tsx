'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// The R3F Canvas is client-only and must never render on the server.
const ImpulseCore = dynamic(() => import('@/components/impulse-core'), {
  ssr: false,
})

type Mode = 'pending' | 'desktop' | 'tablet' | 'fallback'

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}

/**
 * Signature 3D "impulse core" for the welcome screen only.
 * Sits behind the AXIS IMPULSE wordmark, purely decorative (pointer-events
 * none). Falls back to a pure-CSS blue/cyan glow on mobile, when WebGL is
 * unavailable, or under prefers-reduced-motion. The whole thing unmounts with
 * the intro screen, releasing the WebGL context.
 */
export function ImpulseScene() {
  const [mode, setMode] = useState<Mode>('pending')
  const [coreReady, setCoreReady] = useState(false)

  useEffect(() => {
    // Animations always on (product decision): ignore OS reduce-motion. The
    // width and WebGL guards remain — they are capability/performance gates.
    const width = window.innerWidth

    if (width < 768 || !detectWebGL()) {
      setMode('fallback')
      return
    }
    setMode(width < 1024 ? 'tablet' : 'desktop')
  }, [])

  const render3D = mode === 'desktop' || mode === 'tablet'

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      {/* CSS fallback glow -- always present as the atmospheric base. */}
      <div
        className="absolute left-1/2 top-1/2 h-[62vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.1) 0%, rgba(22,133,255,0.09) 30%, rgba(0,102,255,0.05) 52%, transparent 74%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 3D core, masked so its edges melt into the darkness. */}
      {render3D && (
        <div
          className="absolute inset-0"
          style={{
            opacity: coreReady ? 0.82 : 0,
            transition: 'opacity 900ms ease-out',
            maskImage:
              'radial-gradient(52% 48% at 50% 50%, #000 42%, transparent 80%)',
            WebkitMaskImage:
              'radial-gradient(52% 48% at 50% 50%, #000 42%, transparent 80%)',
          }}
        >
          <CoreMount
            quality={mode === 'tablet' ? 'tablet' : 'desktop'}
            onReady={() => setCoreReady(true)}
          />
        </div>
      )}
    </div>
  )
}

/** Small helper so we can flip coreReady once the Canvas has mounted. */
function CoreMount({
  quality,
  onReady,
}: {
  quality: 'desktop' | 'tablet'
  onReady: () => void
}) {
  useEffect(() => {
    // Next tick after mount -> canvas is in the tree, safe to fade in.
    const id = requestAnimationFrame(onReady)
    return () => cancelAnimationFrame(id)
  }, [onReady])

  return <ImpulseCore quality={quality} />
}
