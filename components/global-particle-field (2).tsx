'use client'

import { useEffect, useRef } from 'react'

type P = {
  x: number
  y: number
  r: number
  baseAlpha: number
  vx: number
  vy: number
  depth: number
  floatPhase: number
  floatAmp: number
  pulseSpeed: number
  pulsePhase: number
  color: [number, number, number]
  bright: boolean
}

const DEEP: [number, number, number] = [46, 118, 240] // deep/electric blue
const CYAN: [number, number, number] = [0, 229, 255] // blue-cyan
const WHITE: [number, number, number] = [200, 224, 255] // bluish white

function pickCount(w: number) {
  if (w < 768) return 26 // mobile: 18-32
  if (w < 1024) return 46 // tablet: 35-55
  return 72 // desktop: 55-85
}

/**
 * Single, global, continuous ambient particle field for the whole landing.
 * Canvas 2D (no per-frame React state), capped DPR, organic slow motion,
 * subtle scroll + cursor parallax. Mounted once behind everything. Fully
 * cleans up on unmount and honors prefers-reduced-motion.
 */
export function GlobalParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    // Animations are always on (product decision): ignore the OS reduce-motion
    // setting so particles always drift and the constellation lines animate.
    const reduced = false
    const fine =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    let width = 0
    let height = 0
    let particles: P[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    function build() {
      const count = pickCount(width)
      const brightTarget = width < 768 ? 5 : width < 1024 ? 9 : 13
      particles = Array.from({ length: count }, (_, i) => {
        const depth = rand(0.35, 1) // 1 = near (more parallax), 0.35 = far
        const bright = i < brightTarget
        const roll = Math.random()
        const color = roll < 0.42 ? CYAN : roll < 0.94 ? DEEP : WHITE
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: (rand(0.6, 2.1) + (bright ? 0.9 : 0)) * (0.7 + depth * 0.5),
          baseAlpha: rand(0.14, 0.46) * (bright ? 1.5 : 1),
          vx: rand(-0.05, 0.07) * depth,
          vy: rand(-0.16, -0.04) * depth,
          depth,
          floatPhase: rand(0, Math.PI * 2),
          floatAmp: rand(4, 13),
          pulseSpeed: rand(0.25, 0.8),
          pulsePhase: rand(0, Math.PI * 2),
          color,
          bright,
        }
      })
    }

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    resize()

    // Eased scroll + cursor parallax (kept tiny / almost imperceptible).
    let scrollEased = window.scrollY
    let scrollTarget = window.scrollY
    const onScroll = () => {
      scrollTarget = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let mx = 0
    let my = 0
    let tmx = 0
    let tmy = 0
    const onMove = (e: PointerEvent) => {
      tmx = e.clientX / width - 0.5
      tmy = e.clientY / height - 0.5
    }
    if (fine && !reduced) {
      window.addEventListener('pointermove', onMove, { passive: true })
    }

    let resizeTimer = 0
    const onResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    const wrap = (v: number, max: number) => {
      const m = max + 20
      let r = ((v + 10) % m)
      if (r < 0) r += m
      return r - 10
    }

    // Reusable buffers for the two-pass render (positions -> links -> dots),
    // so we never allocate per frame.
    const rx: number[] = []
    const ry: number[] = []
    const ra: number[] = []

    // Max distance (px) at which two particles get a faint connecting line.
    const linkDist = width < 768 ? 96 : 132
    const linkDistSq = linkDist * linkDist

    let raf = 0
    let last = performance.now()

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const t = now / 1000

      scrollEased += (scrollTarget - scrollEased) * 0.06
      mx += (tmx - mx) * 0.04
      my += (tmy - my) * 0.04

      ctx.clearRect(0, 0, width, height)

      // Pass 1: advance + compute the rendered position and alpha of each
      // particle, caching them so the link pass doesn't recompute anything.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        if (!reduced) {
          p.x += p.vx * dt * 60
          p.y += p.vy * dt * 60
          p.x = wrap(p.x, width)
          p.y = wrap(p.y, height)
        }

        const floatX = reduced ? 0 : Math.sin(t * 0.4 + p.floatPhase) * p.floatAmp * 0.5
        const floatY = reduced ? 0 : Math.cos(t * 0.32 + p.floatPhase) * p.floatAmp * 0.5
        const scrollPar = reduced ? 0 : -scrollEased * 0.03 * p.depth
        const curX = mx * 14 * p.depth
        const curY = my * 14 * p.depth

        rx[i] = p.x + floatX + curX
        ry[i] = wrap(p.y + floatY + scrollPar + curY, height)

        const pulse = reduced ? 0.85 : 0.55 + 0.45 * Math.sin(t * p.pulseSpeed + p.pulsePhase)
        ra[i] = Math.min(0.95, p.baseAlpha * pulse)
      }

      // Pass 2: faint constellation links between nearby particles. Skipped
      // entirely under reduced motion. Alpha fades with distance so lines
      // gently appear/disappear as particles drift.
      if (!reduced) {
        ctx.lineWidth = 1
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const ddx = rx[i] - rx[j]
            const ddy = ry[i] - ry[j]
            const d2 = ddx * ddx + ddy * ddy
            if (d2 > linkDistSq) continue
            const d = Math.sqrt(d2)
            const strength = 1 - d / linkDist
            const la = strength * strength * 0.16
            if (la < 0.008) continue
            ctx.beginPath()
            ctx.moveTo(rx[i], ry[i])
            ctx.lineTo(rx[j], ry[j])
            ctx.strokeStyle = `rgba(0,229,255,${la})`
            ctx.stroke()
          }
        }
      }

      // Pass 3: the particles themselves (glow for the bright ones).
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const alpha = ra[i]
        const [cr, cg, cb] = p.color

        if (p.bright) {
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${alpha * 0.8})`
        } else {
          ctx.shadowBlur = 0
        }

        ctx.beginPath()
        ctx.arc(rx[i], ry[i], p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`
        ctx.fill()
      }
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    // Pause the loop entirely while the tab is hidden (saves battery/CPU),
    // and reset the time reference on resume so dt never jumps.
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
      } else if (raf === 0) {
        last = performance.now()
        raf = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="global-particle-field"
      aria-hidden="true"
    />
  )
}
