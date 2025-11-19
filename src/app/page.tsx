import { Hero } from "@/components/hero"
import { DemoSection } from "@/components/demo-section"
import { AboutSection } from "@/components/about-section"
import { Pricing } from "@/components/pricing"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <DemoSection />
      <AboutSection />
      <div id="pricing">
        <Pricing />
      </div>
      <Footer />
    </main>
  )
}
