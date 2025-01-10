import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import custeioIcon from '@/app/assets/custeio-icon.svg'
import investimentoIcon from '@/app/assets/investimento-icon.svg'
import expansaoIcon from '@/app/assets/expansao-icon.svg'

import antecipacaoIcon from '@/app/assets/antecipacao-icon.svg'
import financiamentoIcon from '@/app/assets/financiamento-icon.svg'
import obrasIcon from '@/app/assets/obras-icon.svg'

import Image from 'next/image'

const agroItens = [
  {
    icon: custeioIcon,
    name: 'Crédito para Custeio',
    description: 'Financiamento visando viabilizar os custos de safra',
  },
  {
    icon: investimentoIcon,
    name: 'Crédito para Investimento',
    description: 'Possibilita o aumento de toda a produção agrícola',
  },
  {
    icon: expansaoIcon,
    name: 'Crédito para expansão de terras',
    description:
      'Possibilita que o produtor adquira o recurso para compra de novas fazendas',
  },
]

const imobiliariaItens = [
  {
    icon: antecipacaoIcon,
    name: 'Antecipação de recebíveis',
    description:
      'Antecipação de valores das vendas de imóveis a prazo ou aluguéis',
  },
  {
    icon: financiamentoIcon,
    name: 'Crédito ponte para financiamento de obras',
    description:
      'Levantamento de verba para início de construções imobiliárias',
  },
  {
    icon: obrasIcon,
    name: 'Crédito para término de obras',
    description:
      'Levantamento de verba para finalização de construções imobiliárias',
  },
]

export function TabsMenu() {
  return (
    <Tabs
      defaultValue="agronegocio"
      className="flex w-full flex-col items-center"
    >
      <TabsList className="overflow-hidden rounded-full bg-[#0F2029] px-10">
        <TabsTrigger
          value="agronegocio"
          className="rounded-none border-r border-slate-400 text-2xl text-gray-400 data-[state=active]:bg-[#0F2029] data-[state=active]:font-bold data-[state=active]:text-white 2xl:text-2xl"
        >
          Agronegócio
        </TabsTrigger>

        <TabsTrigger
          value="imobiliario"
          className="rounded-full text-2xl text-gray-400 data-[state=active]:bg-[#0F2029] data-[state=active]:font-bold data-[state=active]:text-white"
        >
          Imobiliário
        </TabsTrigger>
      </TabsList>

      <div className="py-20">
        <TabsContent
          value="agronegocio"
          className="mt-10 flex text-xl text-white"
        >
          {agroItens.map((item, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center justify-start gap-5"
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={item.icon}
                  alt="icone"
                  width={158}
                  height={144}
                  className="size-32"
                />
                <span className="w-[80%] text-balance text-center text-xl font-bold text-white 2xl:text-2xl">
                  {item.name}
                </span>
              </div>

              <span className="text-balance text-center text-base text-gray-400 xl:w-[80%] 2xl:text-xl">
                {item.description}
              </span>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="imobiliario" className="flex text-xl text-white">
          {imobiliariaItens.map((item, i) => (
            <div
              key={i}
              className="flex flex-1 flex-col items-center justify-start gap-5"
            >
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={item.icon}
                  alt="icone"
                  width={158}
                  height={144}
                  className="size-32"
                />
                <span className="w-[80%] text-balance text-center text-xl font-bold text-white 2xl:text-2xl">
                  {item.name}
                </span>
              </div>

              <span className="text-balance text-center text-base text-gray-400 xl:w-[80%] 2xl:text-xl">
                {item.description}
              </span>
            </div>
          ))}
        </TabsContent>
      </div>
    </Tabs>
  )
}
