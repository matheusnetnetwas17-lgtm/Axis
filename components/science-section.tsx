'use client'

import { useEffect, useRef, useState } from 'react'
import { RevealGroup } from '@/components/reveal-group'
import { SectionAtmosphere } from '@/components/section-atmosphere'

/* ─── Data ─────────────────────────────────────────────────── */
const pillars = [
  {
    label: 'ESTRUTURA',
    title: 'Pare de desperdiçar força antes de sair do chão',
    text: 'Mobilidade, estabilidade e controle ajudam seu corpo a se posicionar melhor para saltar e aterrissar. Quando a base falha, parte da força é perdida antes mesmo de você deixar o chão.',
  },
  {
    label: 'FORÇA',
    title: 'Produza mais força com as pernas',
    text: 'Glúteos, quadríceps, panturrilhas e cadeia posterior formam o motor do salto. Quanto mais força útil suas pernas conseguem aplicar contra o chão, maior é o potencial para elevar o corpo.',
  },
  {
    label: 'ELASTICIDADE',
    title: 'Transforme força em impulso rápido',
    text: 'O salto acontece em poucos instantes. Seu corpo precisa armazenar e devolver energia rapidamente para que a força construída apareça como explosão, reatividade e elevação.',
  },
  {
    label: 'TÉCNICA',
    title: 'Converta tudo em alcance dentro do jogo',
    text: 'Uso dos braços, aproximação, contramovimento e tempo de impulsão determinam quanto da sua capacidade física realmente vira altura no ataque, no bloqueio, no rebote ou em outro movimento explosivo.',
  },
]

/* ─── Timeline item with intersection-triggered dot ─────────── */
function TimelineItem({
  pillar,
  index,
  isLast,
}: {
  pillar: (typeof pillars)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const ease = 'cubic-bezier(0.22, 1, 0.36, 1)'
  const delay = 0.05

  return (
    <div
      ref={ref}
      className="relative flex gap-6 md:gap-10"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        filter: visible ? 'blur(0px)' : 'blur(4px)',
        transition: `opacity 0.75s ${ease} ${delay}s, transform 0.75s ${ease} ${delay}s, filter 0.75s ${ease} ${delay}s`,
        willChange: visible ? undefined : 'opacity, transform, filter',
      }}
    >
      {/* Left: line + dot */}
      <div className="relative flex flex-col items-center" style={{ width: 20 }}>
        {/* Dot */}
        <div
          className="relative z-10 flex shrink-0 items-center justify-center"
          style={{ width: 20, height: 20, marginTop: 2 }}
        >
          {/* Outer glow ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: visible
                ? 'radial-gradient(circle, rgba(47,125,255,0.35) 0%, transparent 70%)'
                : 'transparent',
              transform: visible ? 'scale(2.4)' : 'scale(1)',
              transition: `all 0.6s ${ease} 0.15s`,
            }}
          />
          {/* Inner dot */}
          <span
            className="rounded-full border-2"
            style={{
              width: 14,
              height: 14,
              borderColor: visible
                ? 'rgb(47, 125, 255)'
                : 'rgba(47, 125, 255, 0.25)',
              background: visible ? 'rgb(47, 125, 255)' : 'transparent',
              boxShadow: visible ? '0 0 12px rgba(47,125,255,0.7)' : 'none',
              transition: `all 0.5s ${ease} 0.1s`,
            }}
          />
        </div>

        {/* Connecting line (hidden for last item) */}
        {!isLast && (
          <div
            className="mt-2 flex-1 rounded-full"
            style={{
              width: 2,
              minHeight: 80,
              background: visible
                ? 'linear-gradient(to bottom, rgba(47,125,255,0.55), rgba(47,125,255,0.1))'
                : 'rgba(47,125,255,0.1)',
              transition: `background 0.8s ${ease} 0.3s`,
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`flex-1 pb-12 ${isLast ? '' : 'md:pb-16'}`}>
        {/* Label pill */}
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {pillar.label}
        </span>

        {/* Title */}
        <h3 className="mt-4 text-xl font-bold leading-snug tracking-tight text-foreground md:text-2xl">
          {pillar.title}
        </h3>

        {/* Body */}
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {pillar.text}
        </p>
      </div>
    </div>
  )
}

/* ─── Section ───────────────────────────────────────────────── */
export function ScienceSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      <SectionAtmosphere glowPosition="center" flip />

      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-8">
        {/* Heading */}
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs"
          >
            O método em ordem
          </p>
          <h2 className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            <span data-reveal className="block">
              Você não começa pulando mais.
            </span>
            <span data-reveal className="block">
              Começa <span className="text-impulse glow-impulse">pulando melhor.</span>
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            O salto melhora quando estrutura, força, elasticidade e técnica trabalham juntas. Cada
            pilar resolve uma perda diferente e ajuda você a transformar capacidade física em mais
            alcance.
          </p>
        </RevealGroup>

        {/* Timeline */}
        <div className="mt-16 md:mt-24">
          {pillars.map((pillar, i) => (
            <TimelineItem
              key={pillar.label}
              pillar={pillar}
              index={i}
              isLast={i === pillars.length - 1}
            />
          ))}
        </div>

        {/* Closing line */}
        <div
          className="mx-auto mt-4 max-w-3xl border-t border-border pt-10 text-center md:mt-6 md:pt-12"
        >
          <p className="text-pretty text-lg font-bold leading-relaxed md:text-2xl">
            Trabalhados na ordem certa, esses 4 pilares transformam a mesma força em{' '}
            <span className="text-primary">um salto mais alto</span>.
          </p>
        </div>
      </div>
    </section>
  )
}
