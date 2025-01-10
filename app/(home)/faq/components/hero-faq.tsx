import { HeroContainer } from '@/components/hero-container'
import heroFAQ from '@/app/assets/hero-faq.png'

export function HeroFAQ() {
  return (
    <HeroContainer imageURL={heroFAQ}>
      <h2 className="text-balance text-center text-6xl font-bold">
        Está com dúvidas sobre o nosso negócio?
      </h2>

      <p className="w-[60%] text-center text-3xl">
        Veja se sua dúvida está em nosso FAQ, ou entre em contato com nossa
        equipe.
      </p>
    </HeroContainer>
  )
}
