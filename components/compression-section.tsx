'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ScrollReveal } from '@/components/scroll-reveal'
import { RevealGroup } from '@/components/reveal-group'
import { SectionAtmosphere } from '@/components/section-atmosphere'

const sports = [
  { key: 'volei', label: 'Vôlei' },
  { key: 'basquete', label: 'Basquete' },
  { key: 'outro', label: 'Outro esporte' },
  { key: 'fisico', label: 'Desenvolvimento físico' },
] as const

type SportKey = (typeof sports)[number]['key']

type SportCard = {
  num: string
  chip: string
  title: string
  text: string
}

type SportData = {
  title: string
  explain: string
  cards: [SportCard, SportCard, SportCard]
}

const sportContent: Record<SportKey, SportData> = {
  volei: {
    title: 'Impulsão para dominar acima da rede',
    explain: 'No vôlei, impulsão melhora ataque, bloqueio e presença acima da rede.',
    cards: [
      {
        num: '01',
        chip: 'ATAQUE',
        title: 'Ataque mais alto',
        text: 'Chegue antes na bola e ataque em um ponto mais alto.',
      },
      {
        num: '02',
        chip: 'BLOQUEIO',
        title: 'Bloqueio mais presente',
        text: 'Ganhe mais alcance no ar e feche melhor o espaço acima da rede.',
      },
      {
        num: '03',
        chip: 'CONSISTÊNCIA',
        title: 'Salto mais eficiente',
        text: 'Desenvolva força e coordenação para repetir boas subidas com mais constância.',
      },
    ],
  },
  basquete: {
    title: 'Elevação para disputar melhor cada jogada',
    explain:
      'No basquete, explosão e controle elevam sua presença em rebotes, contestações e finalizações.',
    cards: [
      {
        num: '01',
        chip: 'REBOTE',
        title: 'Disputa mais alta',
        text: 'Suba com mais presença para competir melhor por cada bola.',
      },
      {
        num: '02',
        chip: 'DEFESA',
        title: 'Contestação mais forte',
        text: 'Reaja mais rápido e chegue mais alto nas jogadas defensivas.',
      },
      {
        num: '03',
        chip: 'FINALIZAÇÃO',
        title: 'Mais força no aro',
        text: 'Ganhe explosão para infiltrar e concluir perto da cesta com mais confiança.',
      },
    ],
  },
  outro: {
    title: 'Potência que se transfere para o seu jogo',
    explain:
      'A base de impulsão transfere potência para esportes que exigem arranque, aceleração e troca de direção.',
    cards: [
      {
        num: '01',
        chip: 'ARRANQUE',
        title: 'Saída mais explosiva',
        text: 'Produza mais força no chão para arrancar com mais rapidez.',
      },
      {
        num: '02',
        chip: 'AGILIDADE',
        title: 'Melhor troca de direção',
        text: 'Crie uma base física mais eficiente para reagir, frear e acelerar de novo.',
      },
      {
        num: '03',
        chip: 'TRANSFERÊNCIA',
        title: 'Potência aplicada ao jogo',
        text: 'Transforme força de pernas em desempenho útil nas ações decisivas do seu esporte.',
      },
    ],
  },
  fisico: {
    title: 'Base física para evoluir com mais força',
    explain:
      'Mesmo sem foco em um esporte específico, desenvolver pernas fortes e estáveis melhora sua base atlética.',
    cards: [
      {
        num: '01',
        chip: 'FORÇA',
        title: 'Base de força',
        text: 'Fortaleça pernas e cadeia inferior com mais estabilidade.',
      },
      {
        num: '02',
        chip: 'ESTRUTURA',
        title: 'Corpo mais preparado',
        text: 'Ganhe suporte físico para saltar, correr e sustentar melhor o corpo.',
      },
      {
        num: '03',
        chip: 'EVOLUÇÃO',
        title: 'Base para evoluir',
        text: 'Crie uma fundação atlética sólida para qualquer objetivo futuro.',
      },
    ],
  },
}

export function CompressionSection() {
  const [sport, setSport] = useState<SportKey>('volei')
  const active = sportContent[sport]

  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      <SectionAtmosphere glowPosition="top" />
      <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">

        {/* Heading */}
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs"
          >
            SUA VANTAGEM NÃO TERMINA NA ALTURA
          </p>
          <h2 className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            <span data-reveal className="block">
              Você pode não ter a maior estatura,
            </span>
            <span data-reveal className="block">
              mas ainda pode{' '}
              <span className="text-impulse glow-impulse">construir mais alcance.</span>
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Você não escolheu sua altura. Mas pode desenvolver a força, a impulsão e a técnica que
            ampliam seu alcance dentro do jogo.
          </p>
        </RevealGroup>

        {/* Sport selector */}
        <ScrollReveal delay={0.1} className="mt-10 flex flex-col items-center gap-6 md:mt-14">
          {/* Tabs */}
          <div
            className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-card/60 p-1"
            role="group"
            aria-label="Escolha seu perfil"
          >
            {sports.map((opt) => (
              <button
                key={opt.key}
                type="button"
                aria-pressed={sport === opt.key}
                onClick={() => setSport(opt.key)}
                className="relative cursor-pointer rounded-full px-3 py-2.5 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:text-sm md:px-5 md:py-3"
              >
                {sport === opt.key && (
                  <motion.span
                    layoutId="sport-selector-active"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_rgba(47,125,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    sport === opt.key
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {opt.label}
                </span>
              </button>
            ))}
          </div>

          {/* Active content: explanation + cards */}
          <motion.div
            key={sport}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            {/* Dynamic title */}
            <h3 className="mb-2 text-center text-xl font-bold tracking-tight text-foreground md:text-2xl">
              {active.title}
            </h3>

            {/* Brief explanation */}
            <p className="mx-auto mb-8 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base">
              {active.explain}
            </p>

            {/* Cards grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {active.cards.map((card) => (
                <article
                  key={card.num}
                  className="flex flex-col rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-3xl font-bold text-primary/20">
                      {card.num}
                    </span>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {card.chip}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold leading-snug text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.text}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </ScrollReveal>

      </div>
    </section>
  )
}
