'use client'

import { useRef } from 'react'
import { CtaButton } from '@/components/cta-button'
import { gsap, useGSAP } from '@/lib/gsap'

const accentDots = [
  { top: '22%', left: '14%' },
  { top: '68%', left: '9%' },
  { top: '34%', left: '88%' },
  { top: '78%', left: '82%' },
  { top: '16%', left: '64%' },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  // The hero only mounts after the loading flow completes, so a mount
  // timeline is the correct entrance (no ScrollTrigger dependency here).
  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return
      const items = gsap.utils.toArray<HTMLElement>('[data-hero-reveal]', root)
      if (!items.length) return

      const mm = gsap.matchMedia()

      // Animations always on (product decision): ignore OS reduce-motion.
      mm.add('all', () => {
        gsap.fromTo(
          items,
          { y: 26, autoAlpha: 0, filter: 'blur(5px)' },
          {
            y: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.75,
            stagger: 0.09,
            ease: 'power3.out',
            delay: 0.1,
            clearProps: 'filter',
          },
        )
      })
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden"
    >
      {/* Hero focal accents (sit on top of the global site atmosphere) */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* central blue glow */}
        <div
          className="absolute left-1/2 top-[38%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(47,125,255,0.18) 0%, rgba(47,125,255,0.06) 40%, transparent 70%)',
          }}
        />
        {/* cyan counter-glow */}
        <div className="glow-spot-cyan absolute right-[-6%] top-[10%] h-[340px] w-[340px] rounded-full" />
        {/* bottom horizon glow */}
        <div
          className="absolute bottom-0 left-0 h-40 w-full"
          style={{
            background:
              'linear-gradient(to top, rgba(47,125,255,0.06), transparent)',
          }}
        />
        {/* thin accent lines */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/[0.07] to-transparent" />
        <div className="absolute left-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/[0.03] to-transparent" />
        <div className="absolute right-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-foreground/[0.03] to-transparent" />
        {/* accent dots */}
        {accentDots.map((d, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/40"
            style={{ top: d.top, left: d.left }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex w-full items-center justify-between px-5 py-5 md:px-10 md:py-6">
        <span className="text-sm font-bold tracking-tight text-foreground md:text-base">
          AXIS <span className="gradient-impulse font-mono">IMPULSE</span>
        </span>
        <a
          href="#avaliacao"
          className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground md:text-xs"
        >
          Fazer avaliação
        </a>
      </nav>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-10 text-center md:px-8">
        <div data-hero-reveal>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/40 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground md:text-[10px]">
              AXIS IMPULSE
            </span>
          </div>
        </div>

        <h1
          data-hero-reveal
          className="glow-title max-w-4xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:max-w-5xl md:text-6xl lg:text-7xl"
        >
          Sua altura não precisa decidir{' '}
          <span className="text-impulse glow-impulse">
            até onde você consegue chegar.
          </span>
        </h1>

        <p
          data-hero-reveal
          className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Transforme força e técnica em mais alcance para competir nas jogadas que hoje parecem
          reservadas aos atletas mais altos.
        </p>

        <div data-hero-reveal>
          <div id="avaliacao" className="mt-10 flex scroll-mt-24 flex-col items-center">
            <CtaButton>DESCOBRIR O QUE TRAVA MEU SALTO</CtaButton>
            <p className="mt-4 text-xs text-muted-foreground md:text-sm">
              Em{' '}
              <span className="font-mono font-semibold text-primary">2 minutos</span>, descubra qual capacidade mais limita sua impulsão.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
