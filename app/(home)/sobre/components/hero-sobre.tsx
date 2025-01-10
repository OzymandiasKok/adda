import { HeroContainer } from '@/components/hero-container'
import heroSobre from '@/app/assets/hero-sobre.png'

export function HeroSobre() {
  return (
    <HeroContainer imageURL={heroSobre}>
      <h2 className="text-center text-6xl font-bold">
        Simplifique o mercado de capitais
      </h2>

      <p className="w-[70%] text-center text-3xl">
        Há 4 anos trabalhando em busca de simplificar o acesso às oportunidades
        do mercado de capitais.
      </p>
    </HeroContainer>
  )
}
