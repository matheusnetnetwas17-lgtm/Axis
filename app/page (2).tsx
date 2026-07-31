import { SiteBackground } from '@/components/site-background'
import { MotionProvider } from '@/components/motion-provider'
import { IntroFlow } from '@/components/intro-flow'
import { HeroSection } from '@/components/hero-section'
import { CompressionSection } from '@/components/compression-section'
import { StudiesSection } from '@/components/studies-section'
import { MethodSection } from '@/components/method-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="relative isolate min-h-screen w-full overflow-x-hidden bg-background">
      <SiteBackground />
      <div className="relative z-10">
        <MotionProvider>
          <IntroFlow>
            <HeroSection />
            <CompressionSection />
            <StudiesSection />
            <MethodSection />
            <SiteFooter />
          </IntroFlow>
        </MotionProvider>
      </div>
    </main>
  )
}
