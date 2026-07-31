'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'MÉTODO', href: '#metodo' },
  { label: 'DEPOIMENTOS', href: '#depoimentos' },
]

const SEO_KEYWORDS = [
  'basquete',
  'vôlei',
  'impulsão',
  'pular alto',
  'salto vertical',
  'treino de salto',
  'aumentar impulsão',
  'como pular mais alto',
  'altura no salto',
  'explosão',
  'explosão nas pernas',
  'potência de pernas',
  'força para saltar',
  'pliometria',
  'treino pliométrico',
  'desenvolvimento físico',
  'performance esportiva',
  'salto no vôlei',
  'salto no basquete',
  'ataque no vôlei',
  'bloqueio',
  'saque',
  'alcance no bloqueio',
  'ataque mais alto',
  'presença acima da rede',
  'rebote',
  'contestação',
  'finalização',
  'enterrada',
  'explosão no arranque',
  'aceleração',
  'troca de direção',
  'coordenação',
  'estabilidade',
  'força de base',
  'preparação física',
  'atleta de vôlei',
  'atleta de basquete',
  'treino para impulsão',
  'treino para explosão',
  'evolução no salto',
  'salto mais eficiente',
  'potência aplicada ao jogo',
  'reação mais rápida',
  'base atlética',
  'força da cadeia inferior',
  'salto com consistência',
  'impulsão para saque',
  'impulsão para ataque',
  'impulsão para bloqueio',
  'impulsão para rebote',
]

const PILL_CLASS =
  'inline-flex items-center rounded-full border border-[#22d3ee]/20 bg-[#22d3ee]/[0.02] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/80 transition-colors hover:border-[#22d3ee]/50 hover:text-[#22d3ee] focus-visible:border-[#22d3ee]/50 focus-visible:text-[#22d3ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40'

export function SiteFooter() {
  const year = new Date().getFullYear()
  const [seoOpen, setSeoOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!seoOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setSeoOpen(false)
    }
    function onPointerDown(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSeoOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [seoOpen])

  return (
    <footer className="relative w-full bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-6 py-10 md:px-8 md:py-12">
        {/* ── Navegação ── */}
        <nav aria-label="Navegação do rodapé" className="w-full">
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={PILL_CLASS}>
                  {item.label}
                </a>
              </li>
            ))}
            <li ref={containerRef} className="relative">
              <button
                type="button"
                aria-expanded={seoOpen}
                aria-controls="footer-seo-panel"
                onClick={() => setSeoOpen((v) => !v)}
                className={
                  seoOpen
                    ? 'inline-flex items-center rounded-full border border-[#22d3ee]/60 bg-[#22d3ee]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#22d3ee] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40'
                    : PILL_CLASS
                }
              >
                SEO
              </button>

              {seoOpen && (
                <div
                  id="footer-seo-panel"
                  role="dialog"
                  aria-label="Palavras-chave"
                  className="absolute bottom-[calc(100%+0.75rem)] left-1/2 z-50 flex max-h-[min(60vh,22rem)] w-[min(90vw,34rem)] -translate-x-1/2 flex-col overflow-hidden rounded-2xl border border-[#22d3ee]/25 bg-[#050b18]/95 shadow-[0_0_40px_-12px_rgba(34,211,238,0.25)] backdrop-blur-sm"
                >
                  {/* Cabeçalho */}
                  <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/70">
                      Palavras-chave
                    </span>
                    <button
                      type="button"
                      onClick={() => setSeoOpen(false)}
                      aria-label="Fechar painel de palavras-chave"
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:bg-white/[0.06] hover:text-[#22d3ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3ee]/40"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Pills */}
                  <div className="flex flex-wrap gap-2 overflow-y-auto px-5 py-4">
                    {SEO_KEYWORDS.map((kw) => (
                      <span
                        key={kw}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[12px] text-muted-foreground/75 transition-colors hover:border-[#22d3ee]/40 hover:text-[#22d3ee]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* ── Copyright ── */}
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground/50">
          © {year} AXIS IMPULSE
        </p>

        {/* ── Linha divisória ── */}
        <hr className="w-full border-t border-white/[0.06]" />

        {/* ── Assinatura final ── */}
        <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
          <span className="font-mono text-sm font-bold uppercase tracking-[0.18em] text-foreground/85">
            AXIS <span className="text-[#22d3ee]">IMPULSE</span>
          </span>
          <span className="text-sm font-normal text-muted-foreground/70">
            Jogue acima da sua altura.
          </span>
        </div>
      </div>
    </footer>
  )
}
