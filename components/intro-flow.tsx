'use client'

import { useEffect, useRef, useState } from 'react'
import { IntroScreen } from '@/components/intro-screen'
import { LoadingScreen } from '@/components/loading-screen'

type AppStage = 'intro' | 'intro-exiting' | 'loading' | 'hero'

const INTRO_FADE_MS = 300
const AUDIO_SRC = '/audio/osteogrowth-intro.mp3'
// Safety fallback in case the "ended" event never fires (blocked/failed audio).
const FALLBACK_MS = 4000
// Approximate audio length, used only for the progress bar when the real
// duration/currentTime is not yet available (e.g. audio blocked by the browser).
const APPROX_AUDIO_MS = 3000

export function IntroFlow({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<AppStage>('intro')
  const [progress, setProgress] = useState(0)

  // A single persistent audio instance.
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Locks to guarantee each transition runs exactly once (React Strict Mode safe).
  const startedRef = useRef(false)
  const audioFinishedRef = useRef(false)
  const heroOpenedRef = useRef(false)
  const fallbackRef = useRef<number | null>(null)

  // Create the single audio instance exactly once. Never autoplay here.
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC)
    audio.preload = 'auto'
    audio.loop = false
    audio.volume = 0.65
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
    }
  }, [])

  // Open the hero exactly once.
  const openHero = () => {
    if (heroOpenedRef.current) return
    heroOpenedRef.current = true
    setStage('hero')
  }

  // Finish the flow exactly once: fill the bar, then reveal the hero.
  const finishFlow = () => {
    if (audioFinishedRef.current) return
    audioFinishedRef.current = true
    if (fallbackRef.current !== null) {
      window.clearTimeout(fallbackRef.current)
      fallbackRef.current = null
    }
    setProgress(100)
    window.setTimeout(openHero, 150)
  }

  // Listen for the real "ended" event to release the hero entrance.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleEnded = () => finishFlow()
    audio.addEventListener('ended', handleEnded)
    return () => audio.removeEventListener('ended', handleEnded)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Lock the scroll for every stage except the final hero stage.
  useEffect(() => {
    if (stage === 'hero') return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [stage])

  // Drive the short intro fade-out, then mount the loading screen.
  useEffect(() => {
    if (stage !== 'intro-exiting') return
    const id = window.setTimeout(() => setStage('loading'), INTRO_FADE_MS)
    return () => window.clearTimeout(id)
  }, [stage])

  // Advance the progress bar while loading, synced to the audio when possible.
  // The bar is capped below 100% until the audio actually ends.
  useEffect(() => {
    if (stage !== 'loading') return
    let raf = 0
    const startT = performance.now()

    const tick = (now: number) => {
      if (audioFinishedRef.current) return
      const audio = audioRef.current
      let pct: number
      if (
        audio &&
        Number.isFinite(audio.duration) &&
        audio.duration > 0 &&
        audio.currentTime > 0
      ) {
        pct = (audio.currentTime / audio.duration) * 100
      } else {
        pct = ((now - startT) / APPROX_AUDIO_MS) * 100
      }
      setProgress(Math.min(97, Math.round(pct)))
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [stage])

  // When the hero stage begins, reset scroll position exactly once.
  useEffect(() => {
    if (stage !== 'hero') return
    window.scrollTo(0, 0)
  }, [stage])

  // Clear any pending fallback timer on unmount.
  useEffect(() => {
    return () => {
      if (fallbackRef.current !== null) {
        window.clearTimeout(fallbackRef.current)
        fallbackRef.current = null
      }
    }
  }, [])

  const handleStart = async () => {
    if (startedRef.current) return
    startedRef.current = true

    // Play must happen inside the click handler (browser autoplay policy).
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 0
      try {
        await audio.play()
      } catch {
        // Browser blocked playback: continue the flow normally.
      }
    }

    // Single safety fallback in case "ended" never fires.
    fallbackRef.current = window.setTimeout(finishFlow, FALLBACK_MS)

    setStage('intro-exiting')
  }

  // The landing page is only ever mounted once the hero stage is reached,
  // so it can never flash behind the intro or loading overlays.
  if (stage === 'hero') {
    return <>{children}</>
  }

  return (
    // Transparent overlay so the single fixed SiteBackground (with the global
    // particle field) shows through the intro and continues seamlessly into
    // the landing -- no cut or restart of the particle system.
    <div className="fixed inset-0 z-50 overflow-hidden">
      {(stage === 'intro' || stage === 'intro-exiting') && (
        <IntroScreen leaving={stage === 'intro-exiting'} onStart={handleStart} />
      )}
      {stage === 'loading' && <LoadingScreen progress={progress} />}
    </div>
  )
}
