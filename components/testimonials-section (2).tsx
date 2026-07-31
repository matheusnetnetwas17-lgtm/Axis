'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { RevealGroup } from '@/components/reveal-group'

type Testimonial = {
  id: string
  sport: 'BASQUETE' | 'VÔLEI'
  imgSrc: string
  imgAlt: string
  imgPosition: string
  initials: string
  name: string
  quote: string
  body: string
}

const testimonials: Testimonial[] = [
  {
    id: 'basquete-01',
    sport: 'BASQUETE',
    imgSrc: '/images/basquete-1.webp',
    imgAlt: 'Atleta de basquete em enterrada, braço estendido acima da cesta',
    imgPosition: 'object-[center_20%]',
    initials: 'JO',
    name: 'Jorge',
    quote: 'Comecei a chegar na cesta com muito mais confiança.',
    body: 'Antes eu sentia que faltava explosão na hora de subir. Com os treinos do Axis, comecei a perceber mais força no salto e mais confiança para atacar a cesta. Foi uma evolução que realmente senti dentro da quadra.',
  },
  {
    id: 'volei-01',
    sport: 'VÔLEI',
    imgSrc: '/images/volei-1.webp',
    imgAlt: 'Atleta de vôlei saltando à noite com holofotes, braços estendidos em direção à bola',
    imgPosition: 'object-[center_15%]',
    initials: 'LM',
    name: 'Lucas Matheus',
    quote: 'Meu salto ficou mais firme e consistente.',
    body: 'Eu queria melhorar minha impulsão para conseguir chegar mais alto nos ataques e bloqueios. Seguindo o Axis, senti que meu salto ficou mais forte, coordenado e constante durante os jogos.',
  },
  {
    id: 'basquete-02',
    sport: 'BASQUETE',
    imgSrc: '/images/basquete-2.webp',
    imgAlt: 'Atleta de basquete pendurado na cesta em enterrada noturna, companheiros ao redor',
    imgPosition: 'object-[center_10%]',
    initials: 'RF',
    name: 'Rikelmy Farias',
    quote: 'Hoje consigo subir com muito mais explosão.',
    body: 'O Axis me ajudou a trabalhar meu salto de uma forma mais organizada. Com o tempo, comecei a sentir mais explosão nas pernas e mais facilidade para finalizar perto da cesta.',
  },
  {
    id: 'volei-02',
    sport: 'VÔLEI',
    imgSrc: '/images/volei-2.webp',
    imgAlt: 'Atleta de vôlei em alto salto para ataque em quadra coberta durante partida',
    imgPosition: 'object-[center_25%]',
    initials: 'VI',
    name: 'Vithor',
    quote: 'Passei a chegar mais alto na bola.',
    body: 'Depois que comecei a aplicar os treinos do Axis, senti uma diferença clara na impulsão e no tempo do salto. Hoje entro nas jogadas com mais confiança e consigo aproveitar melhor cada ataque.',
  },
]

function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const [dir, setDir] = useState(1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const count = testimonials.length

  // Prefer reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  function go(next: number) {
    if (animating || next === index) return
    setDir(next > index ? 1 : -1)
    setPrevIndex(index)
    setIndex(next)
    setAnimating(true)
    timerRef.current = setTimeout(() => {
      setPrevIndex(null)
      setAnimating(false)
    }, prefersReducedMotion ? 0 : 350)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  function prev() {
    go((index - 1 + count) % count)
  }

  function next() {
    go((index + 1) % count)
  }

  const t = testimonials[index]

  return (
    <section id="depoimentos" className="relative w-full scroll-mt-24">
      <div className="mx-auto w-full max-w-5xl px-6 py-20 md:px-8 md:py-28">

        {/* Heading */}
        <RevealGroup className="mb-14 text-center md:mb-20">
          <p
            data-reveal
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs"
          >
            Resultados reais
          </p>
          <h2
            data-reveal
            className="glow-title mt-4 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl"
          >
            Resultados Reais de Quem{' '}
            <span className="text-impulse glow-impulse">Levou o Salto a Outro Nível</span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Histórias reais de atletas de basquete e vôlei que aplicaram o Axis e sentiram a
            evolução dentro da quadra.
          </p>
        </RevealGroup>

        {/* Slider */}
        <div
          role="region"
          aria-label="Depoimentos de atletas"
          aria-live="polite"
        >
          {/*
           * Layout: all slides are stacked in the same grid cell (col-start-1 row-start-1).
           * The active slide is visible; others are hidden but their images remain in the DOM
           * so next/image keeps them loaded. This avoids the empty-container bug from
           * AnimatePresence destroying nodes before the incoming image is painted.
           */}
          <div className="relative overflow-hidden">
            <div className="grid">
              {testimonials.map((item, i) => {
                const isActive = i === index
                const isPrev = i === prevIndex

                // Determine transition offset
                const xEnter = isActive && animating ? (prefersReducedMotion ? 0 : dir * 28) : 0
                const isVisible = isActive || isPrev
                // Only fetch the image for the active slide, the one leaving
                // during a transition, and the next one (preloaded). The other
                // slides stay as a stable placeholder box until needed, so the
                // page never downloads all four photos at once.
                const shouldLoad = isActive || isPrev || i === (index + 1) % count

                return (
                  <motion.div
                    key={item.id}
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : isPrev ? (prefersReducedMotion ? 0 : -dir * 28) : 0,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                    transition={prefersReducedMotion ? { duration: 0 } : {
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      gridColumn: '1 / -1',
                      gridRow: '1 / -1',
                      // Keep non-visible slides in DOM but out of tab order
                      visibility: isVisible ? 'visible' : 'hidden',
                      // Ensure incoming slide starts at offset before animating in
                      ...(isActive && animating && prevIndex !== null
                        ? { x: xEnter }
                        : {}),
                    }}
                    className="flex flex-col gap-5 md:flex-row md:items-stretch md:gap-8"
                  >
                    {/* Photo */}
                    <div
                      className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-primary/20 bg-card/40 shadow-[0_0_28px_rgba(47,125,255,0.10)] md:w-[44%]"
                      style={{ aspectRatio: '3/4', maxHeight: '420px' }}
                    >
                      {shouldLoad && (
                        <Image
                          src={item.imgSrc}
                          alt={item.imgAlt}
                          fill
                          sizes="(max-width: 768px) 100vw, 44vw"
                          className={`object-cover ${item.imgPosition}`}
                          loading="lazy"
                        />
                      )}
                      {/* Sport label */}
                      <span className="absolute bottom-4 left-4 rounded-md border border-primary/30 bg-background/75 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-primary backdrop-blur-sm">
                        {item.sport}
                      </span>
                    </div>

                    {/* Card */}
                    <div className="flex w-full flex-col justify-center rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm md:w-[56%] md:p-9">
                      {/* Avatar + identity */}
                      <div className="flex items-center gap-4">
                        <span
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-sm font-bold text-primary"
                        >
                          {item.initials}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {item.sport.charAt(0) + item.sport.slice(1).toLowerCase()}
                          </p>
                        </div>
                      </div>

                      {/* Quote */}
                      <blockquote className="mt-6">
                        <p className="text-balance text-lg font-bold leading-snug text-foreground md:text-xl">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                          {item.body}
                        </p>
                      </blockquote>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-5">
            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              aria-label="Depoimento anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3" role="tablist" aria-label="Selecionar depoimento">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Depoimento ${i + 1} de ${count}: ${item.name}`}
                  onClick={() => go(i)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === index
                        ? 'h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(47,125,255,0.6)]'
                        : 'h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Próximo depoimento"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Post-testimonials CTA */}
          <div className="mt-16 flex justify-center px-4">
            <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-b from-[#0d1e3a] to-[#081526] px-6 py-12 text-center shadow-[0_0_60px_rgba(47,125,255,0.12),inset_0_1px_0_rgba(255,255,255,0.05)] md:px-16 md:py-20">
              {/* Glow blob */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl"
              />

              <h3 className="relative text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
                Descubra o que está{' '}
                <span className="text-primary">limitando seu salto</span>
              </h3>

              <p className="relative mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground md:mt-5 md:text-base">
                Faça uma avaliação rápida e veja qual capacidade deve ser priorizada no seu
                treinamento.
              </p>

              <div className="relative mt-8 flex flex-col items-center gap-3 md:mt-10">
                <a
                  href="#avaliacao"
                  className="group relative inline-flex w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl border border-primary/60 bg-gradient-to-b from-[#4d9aff] to-primary px-4 py-4 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-[0_0_28px_rgba(47,125,255,0.35),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-200 hover:shadow-[0_0_48px_rgba(47,125,255,0.55),inset_0_1px_0_rgba(255,255,255,0.22)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:px-10 md:py-5 md:text-sm md:tracking-[0.2em]"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-full"
                  />
                  FAZER MINHA AVALIAÇÃO
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <p className="text-xs text-muted-foreground/70">Leva cerca de 2 minutos.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
