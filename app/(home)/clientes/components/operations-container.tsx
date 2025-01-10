import { Tittle } from '@/components/tittle'
import crasIcon from '@/app/assets/cras.svg'
import crisIcon from '@/app/assets/cris.svg'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import actPerson from '@/app/assets/young-man.jpg'
import { CTALink } from '@/components/cta-link'

const operations = [
  {
    icon: crasIcon,
    title: "CRA's",
    label: 'O que são?',
    description:
      'São títulos de dívida, lastreados em recebíveis ou outros ativos da atividade agropecuária.',
  },

  {
    icon: crisIcon,
    title: "CRI's",
    label: 'O que são?',
    description:
      'São títulos de dívida, lastreados em recebíveis da atividade imobiliária ou outros ativos como terrenos ou imóveis.',
  },
]

export function OperationsContainer() {
  return (
    <div className="mb-14 mt-14 flex flex-col gap-14 px-11">
      <Tittle>Operações</Tittle>

      <div className="flex justify-center gap-10">
        {operations.map((operation, i) => (
          <Card key={i} className="flex-1 p-11">
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-6">
              <Image src={operation.icon} alt="CRA's" className="w-32" />
              <div className="flex flex-col gap-6 text-center">
                <div className="flex flex-col gap-1 font-bold">
                  <span className="text-3xl font-bold text-themeColor">
                    {operation.title}
                  </span>
                  <span className="text-themeColor-dark text-lg">
                    {operation.label}
                  </span>
                </div>
                <p className="text-xl">{operation.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="flex overflow-hidden rounded-lg">
        <div className="flex flex-1 flex-col justify-center gap-5 p-5 px-10 xl:px-20">
          <span className="text-balance text-5xl font-bold uppercase text-themeColor 2xl:w-[60%]">
            Se torne um cliente Adda
          </span>

          <span className="text-balance text-2xl text-themeColor 2xl:w-[80%]">
            Consiga créditos de maneira simplificada através da nossa
            plataforma.
          </span>

          <div className="mr-auto">
            <CTALink path="/registrar" text="Cadastre-se" type="body3" />
          </div>
        </div>
        <div className="size-[400px] overflow-hidden xl:size-[550px]">
          <Image
            src={actPerson}
            alt="person"
            width={1920}
            height={1080}
            quality={100}
            className="h-full w-full overflow-hidden object-cover"
          />
        </div>
      </Card>
    </div>
  )
}
