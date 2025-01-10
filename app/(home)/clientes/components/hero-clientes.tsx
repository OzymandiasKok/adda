import { HeroContainer } from '@/components/hero-container'
import heroClientes from '@/app/assets/hero-clientes.png'
import { CTALink } from '@/components/cta-link'

export function HeroClientes() {
  return (
    <HeroContainer imageURL={heroClientes}>
      <h2 className="w-[80%] text-balance text-center text-6xl font-bold">
        Faça operações de crédito com quem entende!
      </h2>

      <p className="w-[50%] text-balance text-center text-3xl">
        Crédito através do mercado de capitais.
      </p>

      <CTALink path="/registrar" text="Traga sua operação" type="hero" />
    </HeroContainer>
  )
}
