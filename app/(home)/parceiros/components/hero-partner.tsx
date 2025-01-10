import { HeroContainer } from '@/components/hero-container'
import heroSobre from '@/app/assets/hero-sobre.png'
import { CTALink } from '@/components/cta-link'

export function HeroParceiros() {
  return (
    <HeroContainer imageURL={heroSobre}>
      <h2 className="text-balance text-center text-6xl font-bold">
        Seus clientes com os investidores corretos!
      </h2>

      <p className="w-[70%] text-balance text-center text-3xl">
        Junte-se a nós para levar as melhores oportunidades para seus clientes
      </p>

      <CTALink path="/registrar" text="SEJA ADDA" type="hero" />
    </HeroContainer>
  )
}
