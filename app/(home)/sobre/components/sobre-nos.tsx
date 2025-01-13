import { Tittle } from '@/components/tittle'

export function SobreNos() {
  return (
    <div className="mb-20 flex flex-col gap-10 px-11">
      <Tittle>Sobre nós</Tittle>

      <div className="mx-auto flex flex-col gap-3 text-base 2xl:max-w-[60%] 2xl:gap-5 2xl:text-xl">
        <p className="text-justify">
          A trajetória da Adda Partners na captação de recursos pelo mercado de
          capitais destaca-se pela inovação e visão estratégica. Desde o início,
          a empresa se consolidou como referência na criação de soluções
          práticas para financiar empresas e projetos, utilizando instrumentos
          de mercado que conectam investidores a negócios com alto potencial de
          crescimento.
        </p>
        <p className="text-justify">
          Ao passar dos anos, a Adda Partners mostrou uma grande capacidade de
          adaptação às mudanças regulatórias e às dinâmicas do mercado. Isso lhe
          permitiu continuar captando recursos de forma eficiente e segura,
          sempre antecipando-se às necessidades do setor. A combinação de
          expertise e uma extensa rede de contatos estratégicos tem sido
          essencial para identificar oportunidades.
        </p>
        <p className="text-justify">
          A abordagem ágil e competitiva da Adda Partners tem sido fundamental
          para que seus clientes alcancem o capital necessário, mesmo em
          cenários desafiadores. A empresa segue fortalecendo seu papel no
          mercado, oferecendo soluções personalizadas que maximizam o valor para
          seus parceiros, impulsionando o crescimento de empresas e projetos.
        </p>
      </div>
    </div>
  )
}
