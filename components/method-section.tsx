'use client'

import { useRef } from 'react'
import { Layers, Dumbbell, Zap, Target } from 'lucide-react'
import { SectionAtmosphere } from '@/components/section-atmosphere'
import { gsap, useGSAP } from '@/lib/gsap'
import { TestimonialsSection } from '@/components/testimonials-section'

const principles = [
  {
    icon: Layers,
    title: 'Estrutura',
    text: 'Mobilidade, estabilidade e aterrissagem para criar uma base segura e eficiente antes de exigir explosão.',
  },
  {
    icon: Dumbbell,
    title: 'Força',
    text: 'Desenvolvimento das pernas e da cadeia posterior para produzir mais força contra o chão.',
  },
  {
    icon: Zap,
    title: 'Elasticidade',
    text: 'Pliometria e reatividade para utilizar essa força em menos tempo, no momento do salto.',
  },
  {
    icon: Target,
    title: 'Técnica',
    text: 'Coordenação dos braços, contramovimento, aproximação e aplicação específica no seu esporte.',
  },
]


export function MethodSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return
      const pinWrap = root.querySelector<HTMLElement>('[data-story-pin]')
      const steps = gsap.utils.toArray<HTMLElement>('[data-story-step]', root)
      const counters = gsap.utils.toArray<HTMLElement>('[data-story-counter]', root)
      const fill = root.querySelector<HTMLElement>('[data-story-fill]')
      if (!pinWrap || steps.length < 2) return

      const mm = gsap.matchMedia()

      // ----- Desktop: pinned scroll storytelling -----
      mm.add(
        '(min-width: 900px)',
        () => {
          // Initial state: step 1 active, the others dimmed and slightly offset.
          gsap.set(steps[0], { autoAlpha: 1, scale: 1 })
          gsap.set(steps.slice(1), { autoAlpha: 0.3, y: 28, scale: 0.98 })
          gsap.set(counters[0], { autoAlpha: 1 })
          gsap.set(counters.slice(1), { autoAlpha: 0 })
          if (fill) gsap.set(fill, { scaleX: 1 / steps.length })

          steps.forEach((s, i) =>
            s.classList.toggle('story-active', i === 0),
          )

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinWrap,
              start: 'top top',
              end: () => '+=' + Math.round(window.innerHeight * 2.3),
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          tl.addLabel('step-1')

          for (let i = 1; i < steps.length; i++) {
            const pos = `step-${i}-to-${i + 1}`
            tl.addLabel(pos)
            // dim the previous step
            tl.to(
              steps[i - 1],
              {
                autoAlpha: 0.35,
                scale: 0.98,
                duration: 1,
                ease: 'power2.inOut',
                onStart: () => steps[i - 1].classList.remove('story-active'),
                onReverseComplete: () =>
                  steps[i - 1].classList.add('story-active'),
              },
              pos,
            )
            // bring the next step into focus
            tl.to(
              steps[i],
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: 'power2.inOut',
                onStart: () => steps[i].classList.add('story-active'),
                onReverseComplete: () =>
                  steps[i].classList.remove('story-active'),
              },
              pos,
            )
            // crossfade the 0X / 04 counter
            tl.to(counters[i - 1], { autoAlpha: 0, duration: 0.4 }, pos)
            tl.to(counters[i], { autoAlpha: 1, duration: 0.4 }, `${pos}+=0.3`)
            // advance the progress line
            if (fill) {
              tl.to(
                fill,
                { scaleX: (i + 1) / steps.length, duration: 1, ease: 'none' },
                pos,
              )
            }
            tl.addLabel(`step-${i + 1}`)
            // hold the active step briefly before the next transition
            if (i < steps.length - 1) tl.to({}, { duration: 0.5 })
          }

          return () => {
            steps.forEach((s) => s.classList.remove('story-active'))
          }
        },
      )

      // ----- Mobile / tablet: normal flow, reveal each step individually -----
      mm.add(
        '(max-width: 899px)',
        () => {
          steps.forEach((s) => {
            gsap.fromTo(
              s,
              { y: 24, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: s,
                  start: 'top 88%',
                  toggleActions: 'play none none none',
                  once: true,
                },
              },
            )
          })
        },
      )
      // Reduced motion: no contexts match, everything stays visible.
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
    >
      <SectionAtmosphere glowPosition="top" />

      {/* ===== Pinned storytelling: the 4 pillars ===== */}
      <div
        data-story-pin
        className="relative flex min-h-[100svh] w-full items-center py-16 md:py-0"
      >
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-16 md:px-8">
          {/* Left column: sticky narrative */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
              Como funciona
            </p>
            <h2 className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              O Sistema <span className="gradient-impulse">AXIS IMPULSE</span>
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Quatro capacidades. Uma direção:{' '}
              <span className="font-semibold text-primary">para cima</span>. O método organiza o
              treinamento para que você não dependa de exercícios aleatórios nem pule etapas
              importantes.
            </p>

            {/* Progress indicator (desktop storytelling only) */}
            <div className="mt-10 hidden md:block">
              <div className="grid font-mono text-sm font-bold text-primary">
                {principles.map((_, i) => (
                  <span
                    key={i}
                    data-story-counter
                    className="col-start-1 row-start-1"
                  >
                    {String(i + 1).padStart(2, '0')}{' '}
                    <span className="text-muted-foreground">/ {String(principles.length).padStart(2, '0')}</span>
                  </span>
                ))}
              </div>
              <div className="mt-3 h-px w-48 overflow-hidden rounded-full bg-border">
                <div
                  data-story-fill
                  className="h-full w-full origin-left bg-gradient-to-r from-primary to-[#00e5ff]"
                  style={{ transform: 'scaleX(0.25)' }}
                />
              </div>
            </div>
          </div>

          {/* Right column: the four pillars */}
          <div className="flex flex-col gap-4">
            {principles.map((p) => {
              const Icon = p.icon
              return (
                <article
                  key={p.title}
                  data-story-step
                  className="story-card flex items-start gap-5 rounded-2xl border border-border bg-card p-5 md:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold md:text-xl">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {/* ===== Rest of the section (normal flow, not pinned) ===== */}
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 md:px-8 md:pb-32">
        <TestimonialsSection />


      </div>
    </section>
  )
}
