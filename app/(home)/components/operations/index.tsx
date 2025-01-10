import { Tittle } from '@/components/tittle'
import { Carousel } from './carousel'
import { OpCount } from './op-count'
import { CTALink } from '@/components/cta-link'

export function Operations() {
  return (
    <div className="bg-[#E7E7E7] px-11 py-16">
      <div className="flex flex-col bg-white p-11">
        <Tittle>Nossas Operações</Tittle>
        <Carousel />

        <div className="mx-auto mt-10">
          <CTALink path="/registrar" text="Traga sua Operação" type="outline" />
        </div>
      </div>

      <OpCount />
    </div>
  )
}
