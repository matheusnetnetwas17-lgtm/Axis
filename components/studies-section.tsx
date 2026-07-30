'use client'

import { useEffect, useRef, useState } from 'react'
import { RevealGroup } from '@/components/reveal-group'
import { ScrollReveal } from '@/components/scroll-reveal'
import { SectionAtmosphere } from '@/components/section-atmosphere'

const steps = [
  {
    num: '01',
    label: 'BASE DE FORÇA',
    title: 'Força para sair do chão',
    description: 'Construa a base necessária para produzir mais força contra o solo.',
    highlight: 'Mais força começa em uma base bem construída.',
  },
  {
    num: '02',
    label: 'VELOCIDADE DE FORÇA',
    title: 'Potência no momento do salto',
    description: 'Treine o corpo para aplicar essa força rapidamente quando a jogada exige.',
    highlight: 'Força útil é força produzida no tempo certo.',
  },
  {
    num: '03',
    label: 'PROGRESSÃO POR FASES',
    title: 'Evolução com estrutura',
    description: 'Avance por etapas organizadas de acordo com sua capacidade e experiência.',
    highlight: 'Cada fase prepara o corpo para a próxima.',
  },
]

function useActiveStep(count: number) {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLDivElement | null)[]>([])
  // Track which steps are currently intersecting
  const intersecting = useRef<boolean[]>(Array(count).fill(false))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pick = () => {
      // Prefer the topmost (lowest index) that is currently intersecting
      const idx = intersecting.current.indexOf(true)
      if (idx !== -1) setActive(idx)
    }

    const observers: IntersectionObserver[] = []

    refs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            intersecting.current[i] = entry.isIntersecting
          })
          pick()
        },
        { threshold: 0.4, rootMargin: '0px 0px -15% 0px' },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [count])

  return { active, refs }
}

export function StudiesSection() {
  const { active, refs } = useActiveStep(steps.length)
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  // Line fill: 0% at step 0, 50% at step 1, 100% at step 2
  const lineFill = active === 0 ? '8%' : active === 1 ? '50%' : '96%'

  return (
    <section id="metodo" className="relative w-full scroll-mt-24 overflow-hidden py-20 md:py-32">
      <SectionAtmosphere glowPosition="top" />
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">

        {/* ── Heading ── */}
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs"
          >
            POR QUE O AXIS
          </p>
          <h2
            data-reveal
            className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            Por que usar o AXIS IMPULSE?
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Força, pliometria e progressão organizadas em um método feito para desenvolver seu salto
            sem depender de exercícios aleatórios.
          </p>
        </RevealGroup>

        {/* ── Two-column layout ── */}
        <div className="mt-16 flex gap-8 md:mt-20 md:gap-16">

          {/* Left: counter + progress line */}
          <div className="hidden flex-col items-center md:flex" style={{ width: '72px', minWidth: '72px' }}>
            {/* Label */}
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-muted-foreground/60 [writing-mode:vertical-lr] rotate-180">
              COMO O AXIS CONSTRÓI SEU SALTO
            </p>

            {/* Step counter */}
            <div className="mb-3 flex items-baseline gap-0.5">
              <span
                className="font-mono text-2xl font-bold text-primary transition-all duration-500"
                aria-live="polite"
              >
                {String(active + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-sm text-muted-foreground/50"> / 03</span>
            </div>

            {/* Progress line */}
            <div className="relative flex flex-1 flex-col items-center">
              {/* Track */}
              <div className="absolute inset-x-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-border" />
              {/* Fill */}
              <div
                className="absolute inset-x-1/2 top-0 w-px -translate-x-1/2 origin-top bg-primary transition-all duration-700 ease-out"
                style={{
                  height: reducedMotion ? '100%' : lineFill,
                  boxShadow: '0 0 6px 1px hsl(var(--primary) / 0.35)',
                }}
              />
              {/* Dot for each step */}
              {steps.map((_, i) => (
                <div
                  key={i}
                  className="relative z-10 my-auto"
                  style={{ marginTop: i === 0 ? 0 : 'auto', flex: 1, display: 'flex', alignItems: i === 0 ? 'flex-start' : i === steps.length - 1 ? 'flex-end' : 'center' }}
                >
                  <span
                    className="block h-2.5 w-2.5 rounded-full border-2 transition-all duration-500"
                    style={{
                      borderColor: i <= active ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                      backgroundColor: i <= active ? 'hsl(var(--primary))' : 'transparent',
                      boxShadow: i === active ? '0 0 8px 2px hsl(var(--primary) / 0.5)' : 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: steps */}
          <div className="flex flex-1 flex-col">
            {/* Mobile: thin line on the left */}
            <div className="absolute left-8 md:hidden" style={{ top: 0, bottom: 0, width: '1px', backgroundColor: 'hsl(var(--border))' }} />

            {steps.map((step, i) => {
              const isActive = reducedMotion || i === active
              const isPast = reducedMotion || i < active

              return (
                <div
                  key={step.num}
                  ref={(el) => { refs.current[i] = el }}
                  className="group relative flex gap-6 md:gap-8"
                  style={{ paddingBottom: i < steps.length - 1 ? '3.5rem' : 0 }}
                >
                  {/* Mobile line dot */}
                  <div className="relative flex flex-col items-center md:hidden" style={{ minWidth: '20px' }}>
                    <span
                      className="mt-1.5 block h-2.5 w-2.5 shrink-0 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: isActive || isPast ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                        backgroundColor: isActive || isPast ? 'hsl(var(--primary))' : 'transparent',
                      }}
                    />
                    {i < steps.length - 1 && (
                      <div className="mt-2 flex-1 w-px bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 pb-1 transition-all duration-500"
                    style={{
                      opacity: reducedMotion ? 1 : isActive ? 1 : 0.38,
                      transform: reducedMotion ? 'none' : isActive ? 'translateY(0)' : 'translateY(6px)',
                    }}
                  >
                    {/* Number + label */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-4xl font-bold text-primary/20 md:text-5xl leading-none">
                        {step.num}
                      </span>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                        {step.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="mt-4 text-xl font-bold tracking-tight transition-colors duration-500 md:text-2xl"
                      style={{ color: isActive ? 'hsl(var(--foreground))' : 'hsl(var(--muted-foreground))' }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
                      {step.description}
                    </p>

                    {/* Highlight */}
                    <p
                      className="mt-3 text-sm font-semibold transition-all duration-500 md:text-base"
                      style={{
                        color: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                        opacity: isActive ? 1 : 0.5,
                      }}
                    >
                      {step.highlight}
                    </p>

                    {/* Subtle divider (not after last) */}
                    {i < steps.length - 1 && (
                      <div className="mt-10 hidden h-px w-full bg-border/50 md:block" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Closing text ── */}
        <ScrollReveal className="mx-auto mt-16 max-w-3xl text-center md:mt-20">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Não é sobre encontrar um exercício mágico. É sobre{' '}
            <span className="font-semibold text-foreground">
              as capacidades certas, na ordem certa.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
