'use client'

import { ScrollReveal } from '@/components/scroll-reveal'
import { RevealGroup } from '@/components/reveal-group'
import { MotionStagger, MotionItem } from '@/components/motion-primitives'
import { SectionAtmosphere } from '@/components/section-atmosphere'
import { handleSpotlightMove } from '@/lib/spotlight'

const metrics = [
  {
    num: '01',
    title: 'Alcance em pé',
    text: 'Quanto você alcança com o braço estendido, em pé. O ponto de partida da sua Altura de Jogo.',
  },
  {
    num: '02',
    title: 'Salto parado',
    text: 'Sua impulsão sem corrida, medida a partir de uma posição estática.',
  },
  {
    num: '03',
    title: 'Salto com aproximação',
    text: 'Seu salto com passos de aproximação, como realmente acontece dentro do jogo.',
  },
  {
    num: '04',
    title: 'Controle de aterrissagem',
    text: 'A qualidade e a estabilidade com que você absorve o impacto ao cair.',
  },
]

export function ResultsSection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      <SectionAtmosphere glowPosition="top" />
      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-8">
        {/* Heading */}
        <RevealGroup className="text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs"
          >
            Evolução mensurável
          </p>
          <h2 className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            <span data-reveal className="block">
              Você não precisa confiar no espelho.
            </span>
            <span data-reveal className="block">
              <span className="text-impulse">Precisa medir.</span>
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            O Axis Impulse começa com uma linha de base e termina com um novo teste. Assim, você
            acompanha o que realmente mudou.
          </p>
        </RevealGroup>

        {/* Metric cards */}
        <MotionStagger className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {metrics.map((m) => (
            <MotionItem
              key={m.num}
              as="article"
              interactive
              onPointerMove={handleSpotlightMove}
              className="spotlight-surface flex flex-col rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-4xl font-bold text-primary/25 md:text-5xl">
                  {m.num}
                </span>
                <span className="rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Linha de base → reteste
                </span>
              </div>
              <h3 className="mt-6 text-lg font-bold md:text-xl">{m.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>
            </MotionItem>
          ))}
        </MotionStagger>

        {/* Closing note */}
        <ScrollReveal className="mx-auto mt-12 max-w-2xl text-center md:mt-16">
          <p className="text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Sem depender de percepção: você mede no começo, treina e mede de novo. O progresso
            aparece nos números do seu próprio salto.
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
