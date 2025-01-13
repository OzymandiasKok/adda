import { Button } from '@/components/ui/button'
import { StepButton } from './step-button'
import { Tittle } from '@/components/tittle'
import { CTALink } from '@/components/cta-link'

export function PartnerContainer() {
  return (
    <div className="container mx-auto mt-14 flex w-full max-w-[1280px] flex-col items-center px-5">
      <Tittle>Nossa Parceria</Tittle>
      <p className="mt-10 text-center text-2xl leading-[44x]">
        Nossas parcerias são baseadas em compromisso e transparência, isso
        contribui com uma relação duradoura a longo prazo
      </p>
      <div className="mt-24 flex justify-between">
        <StepButton step={1} text="Cadastre-se" active={true} isFirst />
        <StepButton step={2} text="Envie suas operações" />
        <StepButton step={3} text="Estruturação do papel" />
        <StepButton step={4} text="Viabilidade" />
        <StepButton step={5} text="Distribuição para investidores" />
        <StepButton step={6} text="Comissão" isLast />
      </div>

      <div className="mb-32 mt-36">
        <CTALink path="/faq" text="Saiba mais!" type="body" />
      </div>
    </div>
  )
}
