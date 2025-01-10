import { CTALink } from '@/components/cta-link'
import { Tittle } from '@/components/tittle'

const steps = [
  {
    title: 'Torne-se um parceiro',
    content: 'Cadastre-se de maneira fácil e rápida.',
  },

  {
    title: 'O início da originação',
    content:
      'Utilize a nossa plataforma, disponibilize os dados da operação para análise.',
  },

  {
    title: 'Averiguação dos documentos',
    content: 'Análise dos documentos e conferência da operação.',
  },

  {
    title: 'Crédito Viável',
    content:
      'Após análise, caso seja favorável, as tratativas de distribuição junto ao investidor são iniciadas.',
  },

  {
    title: 'Distribuindo a operação',
    content: 'Utilize nossa plataforma para acompanhar o status da operação.',
  },

  {
    title: 'Receba sua comissão',
    content:
      'Após aprovação dos investidores e distribuição do papel, receba seu comissionamento.',
  },
]

export function OurPartner() {
  return (
    <div className="my-14 flex flex-col gap-14">
      <Tittle>Nossa Parceria</Tittle>

      <div className="container mx-auto grid grid-cols-2 place-items-center gap-x-20 gap-y-20 2xl:gap-x-5 2xl:px-20">
        {steps.map((step, i) => (
          <div key={i} className="flex w-[450px] items-center gap-5">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-themeColor text-5xl font-bold text-white shadow-md">
              {i + 1}
            </div>
            <div className="flex w-full flex-col">
              <span className="text-xl font-bold text-themeColor 2xl:text-2xl">
                {step.title}
              </span>

              <span className="2xl:text-xl">{step.content}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-14">
        <CTALink path="/registrar" text="Seja Parceiro" type="body" />
      </div>
    </div>
  )
}
