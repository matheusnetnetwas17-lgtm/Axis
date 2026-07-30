import { GlobalParticleField } from '@/components/global-particle-field'

/**
 * Single, continuous ambient environment shared by the whole page (intro +
 * landing). Fixed behind all content so scrolling reveals one uninterrupted
 * atmosphere instead of per-section backgrounds. Never unmounts, so the
 * transition intro -> loading -> hero has no visual cut. Purely decorative.
 *
 * Layers (back -> front):
 *  1. Deep navy base wash with wide, soft radial depth (single environment).
 *  2. Two large "breathing" glows for living, subtle movement.
 *  3. Discreet masked tech grid.
 *  4. Global animated particle field (Canvas 2D).
 */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* 1. base wash: one cohesive navy environment, no per-section jumps */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 8%, rgba(0,102,255,0.10), transparent 34%),' +
            'radial-gradient(circle at 20% 46%, rgba(0,229,255,0.045), transparent 32%),' +
            'radial-gradient(circle at 82% 72%, rgba(0,102,255,0.05), transparent 36%),' +
            'linear-gradient(180deg, #050b19 0%, #060c1b 45%, #050a16 100%)',
        }}
      />

      {/* 2. breathing glows */}
      <div
        className="absolute left-1/2 top-[-12%] h-[60vh] w-[80vw] max-w-[1100px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(47,125,255,0.13) 0%, rgba(47,125,255,0.04) 45%, transparent 70%)',
          animation: 'bg-breathe 14s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-6%] h-[52vh] w-[60vw] max-w-[820px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.08) 0%, rgba(0,229,255,0.02) 45%, transparent 70%)',
          animation: 'bg-breathe 18s ease-in-out infinite',
          animationDelay: '3s',
        }}
      />

      {/* 3. discreet tech grid */}
      <div className="bg-grid absolute inset-0" />

      {/* 4. global animated particles */}
      <GlobalParticleField />
    </div>
  )
}
