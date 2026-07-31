'use client'

import { useEffect, useState } from 'react'
import { ImpulseScene } from '@/components/impulse-scene'

const spineDots = [15, 28, 41, 54, 67, 80]

const particles = [
  { left: '27%', duration: '7.5s', delay: '0.8s' },
  { left: '39%', duration: '9s', delay: '1.6s' },
  { left: '51%', duration: '10.5s', delay: '2.4s' },
  { left: '63%', duration: '12s', delay: '3.2s' },
  { left: '75%', duration: '13.5s', delay: '4s' },
  { left: '87%', duration: '15s', delay: '4.8s' },
]

type IntroScreenProps = {
  leaving: boolean
  onStart: () => void
}

export function IntroScreen({ leaving, onStart }: IntroScreenProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const reveal = (delay: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
  })

  return (
    <div
      className="absolute inset-0 flex select-none items-center justify-center overflow-hidden"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      {/* Decorative background: central spine, side lines, rising particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/[0.06] to-transparent" />
        {spineDots.map((top) => (
          <div
            key={top}
            className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary/10"
            style={{ top: `${top}%` }}
          >
            <div className="absolute -left-3 top-1/2 h-px w-7 -translate-y-1/2 bg-gradient-to-r from-transparent via-primary/[0.06] to-transparent" />
          </div>
        ))}
        <div className="absolute left-[30%] top-[10%] h-[60%] w-px bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />
        <div className="absolute right-[30%] top-[20%] h-[50%] w-px bg-gradient-to-b from-transparent via-foreground/[0.02] to-transparent" />
        {particles.map((p) => (
          <div
            key={p.left}
            className="absolute bottom-0 h-0.5 w-0.5 rounded-full bg-primary/20"
            style={{
              left: p.left,
              animation: `particle-rise ${p.duration} ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="z-10 flex w-full max-w-2xl flex-col items-center px-10 text-center md:px-16">
        <p
          className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:text-xs"
          style={reveal(0)}
        >
          Bem-vindo ao
        </p>

        <div className="intro-brand-stage mb-8 mt-3 md:mb-12 md:mt-4">
          {/* Aura + 3D core, both centered on the wordmark. */}
          <div className="intro-brand-glow" aria-hidden="true">
            {/* Aura (behind the 3D object). */}
            <div className="intro-aurora">
              <div className="intro-aurora__spin" />
              <div className="intro-aurora__core" />
            </div>
            {/* Signature 3D impulse core (welcome screen only). */}
            <ImpulseScene />
          </div>

          <h1
            className="text-5xl font-bold tracking-tight text-foreground md:text-8xl"
            style={{
              opacity: mounted ? 1 : 0,
              filter: mounted ? 'blur(0px)' : 'blur(10px)',
              letterSpacing: '-0.02em',
              transition: 'opacity 1s ease-out 0.1s, filter 1s ease-out 0.1s',
            }}
          >
            AXIS <span className="text-impulse glow-impulse font-mono">IMPULSE</span>
          </h1>
        </div>

        <div
          className="mb-10 h-px w-16 md:mb-14 md:w-24"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s',
            background:
              'linear-gradient(90deg, transparent, var(--muted-foreground), transparent)',
          }}
        />

        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'scale(1)' : 'scale(0.9)',
            transition: 'opacity 0.7s ease-out 0.45s, transform 0.7s ease-out 0.45s',
          }}
        >
          <button
            type="button"
            onClick={onStart}
            disabled={leaving}
            className="cursor-pointer rounded-lg border border-border bg-transparent px-16 py-4 text-sm font-bold uppercase tracking-[0.35em] text-foreground transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-[0_0_30px_rgba(47,125,255,0.25)] disabled:pointer-events-none md:px-20 md:py-5 md:text-base"
          >
            Iniciar
          </button>
        </div>

        <p
          className="mt-10 text-[10px] uppercase tracking-[0.3em] text-muted-foreground md:mt-12 md:text-xs"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.65s',
          }}
        >
          Jogue acima da sua altura.
        </p>
      </div>
    </div>
  )
}
