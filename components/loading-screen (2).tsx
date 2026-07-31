'use client'

import { useEffect, useState } from 'react'

type LoadingScreenProps = {
  progress: number
}

export function LoadingScreen({ progress }: LoadingScreenProps) {
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    // Short, isolated entrance (no crossfade with the intro).
    const id = window.setTimeout(() => setEntered(true), 20)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <div
      className="absolute inset-0 flex select-none items-center justify-center bg-background/55 backdrop-blur-[1px]"
      style={{
        opacity: entered ? 1 : 0,
        transition: 'opacity 130ms ease-out',
      }}
    >
      <div className="flex w-full max-w-xs flex-col items-center px-8 md:max-w-sm">
        <p className="mb-8 text-xl font-bold tracking-tight text-foreground md:text-2xl">
          AXIS <span className="text-impulse font-mono">IMPULSE</span>
        </p>

        <div className="h-px w-full overflow-hidden bg-border/60">
          <div
            className="h-full bg-primary transition-[width] duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 12px rgba(47,125,255,0.6)',
            }}
          />
        </div>

        <div className="mt-4 flex w-full items-center justify-between">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Carregando sistema...
          </span>
          <span className="font-mono text-xs font-semibold text-primary">{progress}%</span>
        </div>
      </div>
    </div>
  )
}
