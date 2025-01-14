import { Tittle } from '@/components/tittle'
import userIcon from '@/app/assets/user.svg'
import operationIcon from '@/app/assets/operation.svg'
import searchIcon from '@/app/assets/search.svg'
import structureIcon from '@/app/assets/structure.svg'
import moneyIcon from '@/app/assets/money.svg'
import handsIcon from '@/app/assets/hands.svg'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { CTALink } from '@/components/cta-link'

const process = [
  {
    icon: userIcon,
    title: 'Cadastre-se',
    description:
      'Cadastre-se gratuitamente  em nossa plataforma de maneira simples e rápida!',
  },

  {
    icon: operationIcon,
    title: 'Operação',
    description:
      'Informe o montante que deseja e os detalhes do seu negócio para estruturarmos a operação.',
  },

  {
    icon: searchIcon,
    title: 'Análise',
    description:
      'Nesse momento, a partir das informações enviada, são analisadas: A viabilidade da operação e a melhor solução para você.',
  },

  {
    icon: structureIcon,
    title: 'Estruturação',
    description:
      'Após a análise da viabilidade do crédito, formalizamos e estruturamos a operação.',
  },

  {
    icon: moneyIcon,
    title: 'Investidores',
    description:
      'Iniciamos as tratativas de distribuição junto ao investidor, acompanhando todo o processo até o desfecho.',
  },

  {
    icon: handsIcon,
    title: 'Fechamento',
    description:
      'Quando distribuída, ocorre a liquidação da operação conforme acordado anteriormente.',
  },
]

export function OurProcess() {
  return (
    <div className="mb-14 mt-14 flex flex-col gap-14 px-11">
      <Tittle>Nosso Processo</Tittle>

      <div className="flex flex-col rounded-2xl bg-themeColor p-11">
        <div className="mx-auto grid auto-rows-fr grid-cols-3 items-stretch gap-11">
          {process.map((item, i) => (
            <Card
              key={i}
              className="flex h-full w-[300px] flex-col items-center gap-5 rounded-3xl border-2 border-white bg-themeColor p-3 px-10"
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={item.icon}
                  alt="icone"
                  width={100}
                  height={100}
                  className="size-10"
                />

                <span className="text-xl font-bold text-white">
                  {item.title}
                </span>
              </div>

              <span className="h-full text-balance text-center text-lg text-zinc-300">
                {item.description}
              </span>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-14">
          <CTALink path="/registrar" text="Cadastre-se" type="outline2" />
        </div>
      </div>
    </div>
  )
}
