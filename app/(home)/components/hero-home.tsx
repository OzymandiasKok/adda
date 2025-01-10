import { HeroContainer } from '@/components/hero-container'
import heroHome from '@/app/assets/hero-home.png'
import { CTALink } from '@/components/cta-link'

export function HeroHome() {
  return (
    <HeroContainer imageURL={heroHome}>
      <h2 className="w-[90%] text-center text-6xl font-bold">
        Seja um parceiro ADDA e fature com a sua rede de contatos!
      </h2>

      <p className="w-[80%] text-center text-3xl">
        Recomende operações de qualidade e gere oportunidades
      </p>

      <CTALink path="/registrar" text="SEJA ADDA" type="hero" />
    </HeroContainer>
  )
}
