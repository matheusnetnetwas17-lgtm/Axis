'use client'

import { ScrollReveal } from '@/components/scroll-reveal'
import { RevealGroup } from '@/components/reveal-group'
import { MotionStagger, MotionItem } from '@/components/motion-primitives'
import { CtaButton } from '@/components/cta-button'
import { SectionAtmosphere } from '@/components/section-atmosphere'

const steps = [
  {
    num: '01',
    tag: 'Sobre você',
    title: 'Conte sobre o seu jogo',
    text: 'Escolha seu esporte, posição, idade, experiência e o que você mais quer melhorar.',
  },
  {
    num: '02',
    tag: 'Testes simples',
    title: 'Faça testes simples',
    text: 'Meça seu alcance e responda sobre sua força, mobilidade e salto atual.',
  },
  {
    num: '03',
    tag: 'Seu limitador',
    title: 'Descubra seu limitador',
    text: 'Com base nas suas respostas, o sistema identifica se o gargalo principal está na estrutura, força, elasticidade ou técnica.',
  },
  {
    num: '04',
    tag: 'Sua trilha',
    title: 'Receba sua trilha',
    text: 'Veja qual caminho combina melhor com seu perfil e como o Sistema AXIS IMPULSION trabalha sua evolução.',
  },
]

export function DiscoverySection() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32">
      <SectionAtmosphere glowPosition="center" flip />
      <div className="relative mx-auto w-full max-w-4xl px-6 md:px-8">
        {/* Heading */}
        <RevealGroup className="mx-auto max-w-3xl text-center">
          <span data-reveal className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            4 passos
          </span>
          <h2 className="glow-title mt-6 text-balance text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            <span data-reveal className="block">
              Descubra o que está
            </span>
            <span data-reveal className="block">
              <span className="text-impulse">segurando seu salto</span>
            </span>
          </h2>
          <p
            data-reveal
            className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Da primeira resposta ao seu plano de evolução, sem termos complicados e sem enrolação.
          </p>
        </RevealGroup>

        {/* Steps timeline */}
        <div className="relative mx-auto mt-14 max-w-2xl md:mt-20">
          <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-primary via-primary/40 to-primary/10 md:left-[9px]" />

          <MotionStagger className="flex flex-col gap-12 md:gap-14">
            {steps.map((s) => (
              <MotionItem key={s.num} className="relative pl-8 md:pl-12">
                <span className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background md:h-[18px] md:w-[18px]">
                  <span className="absolute inset-[3px] rounded-full bg-primary" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-lg font-bold text-primary">{s.num}</span>
                  <span className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {s.tag}
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-bold md:text-2xl">{s.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {s.text}
                </p>
              </MotionItem>
            ))}
          </MotionStagger>
        </div>

        {/* CTA */}
        <ScrollReveal className="mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-b from-primary/[0.07] to-card/50 p-8 text-center backdrop-blur-sm md:p-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary md:text-xs">
              A altura que você tem é só o começo
            </p>
            <h3 className="mx-auto mt-4 max-w-2xl text-balance text-2xl font-bold leading-tight tracking-tight md:text-4xl">
              Descubra quanto do seu salto ainda está{' '}
              <span className="text-impulse glow-impulse">ficando no chão</span>.
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
              Em poucos minutos, entenda seu perfil e veja qual capacidade precisa evoluir primeiro.
            </p>

            <div className="mt-8 flex justify-center">
              <CtaButton>Descobrir meu perfil vertical</CtaButton>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Gratuito, direto e sem compromisso.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
