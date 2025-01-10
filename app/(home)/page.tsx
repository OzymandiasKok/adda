import { FAQ } from '@/components/faq'
import { Feedbacks } from './components/feedbacks'
import { Operations } from './components/operations'
import { PartnerContainer } from './components/partner-container'
import { HeroHome } from './components/hero-home'

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <HeroHome />
      <PartnerContainer />
      <Operations />
      <Feedbacks />
      <FAQ />
    </main>
  )
}
