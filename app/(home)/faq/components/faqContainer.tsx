import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'O que é um CRI/CRA?',
    answer:
      'São certificados de recebíveis imobiliários e agropecuários, respectivamente. Títulos de crédito de emissão exclusiva por securitizadoras e títulos de renda fixa.',
  },

  {
    question: 'Qual o papel da ADDA?',
    answer:
      'A ADDA atua no processo como um todo. Desde o começo da originação, até a fase de distribuição juntamente com investidores da nossa base.',
  },

  {
    question: 'Quem a ADDA atende?',
    answer:
      'O foco da ADDA está em pequenas e médias empresas dos setores agropecuário e imobiliário.',
  },
  {
    question:
      'Quais são os critérios básicos para identificar operações imobiliárias?',
    answer:
      'Os principais critérios básicos para identificar uma operação imobiliária seriam: a aprovação do projeto e análise da carteira de recebíveis do cliente, visto que não temos operações sem o projeto aprovado e sem vendas do empreendimento.',
  },
  {
    question:
      'Quais são os critérios básicos para identificar operações agropecuárias?',
    answer:
      'Os principais critérios para operações agropecuárias são inicialmente, analisar o quadro de safras e endividamento do cliente, visando entender como funciona o processo como um todo.',
  },
  {
    question:
      'Para operação de CRI, as obras precisam ter quanto de avanço físico?',
    answer:
      'Depende do tipo de operação que o cliente estiver interessado. No caso de operações com enfoque no término de obras, precisam ter no mínimo 50% de avanço físico.',
  },
  {
    question:
      'Para operação de CRI, o empreendimento precisa ter qual percentual mínimo de vendas?',
    answer: 'O empreendimento deve ter pelo menos 50% da carteira vendida.',
  },
  {
    question: 'Quais tipos de garantia são oferecidas para operações Agropecuárias?',
    answer:
      'Nas operações agropecuárias, conseguimos trabalhar com garantias do tipo de Alienação Fiduciária e Penhor de Grãos.',
  },
  {
    question:
      'Quais tipos de garantias são oferecidas para operações imobiliárias?',
    answer:
      'Nas operações imobiliárias, conseguimos trabalhar com Alienações Fiduciárias e Cessão de recebíveis.',
  },
  {
    question: 'Por que emitir um CRI?',
    answer:
      'A emissão de um Certificado de Recebíveis Imobiliários (CRI) é uma alternativa atrativa para empresas e empreendedores do setor imobiliário que buscam obter financiamento para seus projetos, como construção, desenvolvimento e aquisição de imóveis.\nAo emitir CRIs, as empresas conseguem acessar capital de longo prazo de forma mais eficiente, sem depender exclusivamente de empréstimos bancários, que costumam apresentar taxas de juros mais elevadas e prazos menos flexíveis.\nDessa forma, o CRI permite que diversifiquem suas fontes de financiamento, reduzindo sua dependência do sistema bancário tradicional e criando maior flexibilidade para seu planejamento.',
  },
  {
    question: 'Por que emitir um CRA?',
    answer:
      'A emissão de Certificados de Recebíveis do Agronegócio (CRA) oferece uma alternativa estratégica para empresas e empreendedores do setor agrícola que buscam financiar suas operações e expandir seus negócios.\nAo emitir CRAs, as empresas conseguem acessar capital de longo prazo de forma eficiente, sem depender exclusivamente de empréstimos bancários, que geralmente envolvem custos mais elevados e condições mais específicas.\nEsse título também permite a diversificação das fontes de financiamento, reduzindo a dependência do crédito bancário, proporcionando maior flexibilidade no planejamento financeiro.\nAlém disso, o CRA é vantajoso para o agronegócio, pois as condições de financiamento podem ser ajustadas às especificidades do setor, com as sazonalidades e as flutuações nas receitas.',
  },
  {
    question: 'Qual o fluxo da operação de um CRI?',
    answer:
      'O fluxo da operação se inicia já na identificação da oportunidade, ou seja, na originação. Na qual a empresa ou empreendimento do setor imobiliário busca financiamento para os projetos.\n Após a originação, damos início à procura de parceiros para a emissão do papel, quando encontramos, essa operação é formalizada por meio de um contrato.\n Posteriormente é iniciada a estruturação da mesma, envolvendo análise de crédito, modelagem financeira e elaboração de documentos que definem os direitos e garantias.\n Quando a operação está estruturada, partimos para a emissão e venda do papel no mercado de capitais, a fim de capitar investidores. Podendo ser enquadrados em ofertas públicas ou privadas.\n  Durante todo o processo do projeto, há a administração dos recebíveis e avanço da obra, para garantir que não ocorra eventuais inadimplências.\n Por fim, ocorre a liquidação da operação, onde os termos dos pagamentos são alcançados, encerrando a operação.',
  },
  {
    question: 'Qual o fluxo da operação de um CRA?',
    answer:
      'O fluxo da operação se inicia já na identificação da oportunidade, ou seja, na originação. Na qual a empresa ou empreendedor do setor agropecuário busca financiamento para os projetos.\nApós a originação, damos início à procura de parceiros para a emissão do papel, quando encontramos, essa operação é formalizada por meio de um contrato.\n Posteriormente é iniciada a estruturação da mesma, envolvendo análise de crédito, modelagem financeira e elaboração de documentos que definem os direitos e garantias.\n Quando a operação está estruturada, partimos para a emissão e venda do papel no mercado de capitais, a fim de capitar investidores. Podendo ser enquadrados em ofertas públicas ou privadas.\n Por fim, ocorre a liquidação da operação, onde os termos dos pagamentos são alcançados, encerrando a operação.',
  },
  {
    question: 'Quais os documentos iniciais para uma operação de CRA? ',
    answer: {
      title: 'CRA',
      subtitle: {
        empresas: [
          'Apresentação institucional',
          'Endividamento',
          'Demonstrações financeiras dos últimos 3 anos',
        ],
        pessoaFisica: [
          'Kit banco',
          'História do produtor',
          'Endividamento e detalhamento de safras',
        ],
      },
    },
  },

  {
    question: 'Quais os documentos iniciais para uma operação de CRI? ',
    answer: {
      title: 'CRI',
      subtitle: {
        construtoras: [
          'Aprovação do projeto',
          'Apresentação do empreedimento',
          'Fluxo de Carteira',
          'VGV',
          'Custo de obra e avanço financeiro',
          'Carteira de vendas',
          'Demonstrações financeiras dos últimos 3 anos',
        ],
      },
    },
  },
]

export function FaqContainer() {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-5">
      {faqs.map((faq, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="rounded-md px-4 text-base font-bold shadow-md"
        >
          <AccordionTrigger className="text-xl font-bold 2xl:text-2xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="whitespace-pre-wrap text-lg font-normal 2xl:text-xl">
            {i >= faqs.length - 2 ? (
              <div className="">
                <div className="flex flex-col gap-3 px-5">
                  {typeof faq.answer === 'object' && faq.answer !== null ? (
                    <>
                      <span className="text-xl font-bold">
                        {faq.answer.title}
                      </span>
                      <div className="flex items-start gap-20">
                        {faq.answer.subtitle.construtoras ? (
                          <ul className="text-base">
                            {/* <span className="font-bold">Construtoras:</span> */}
                            {faq.answer.subtitle.construtoras.map(
                              (item, index) => (
                                <li key={index}>• {item}</li>
                              ),
                            )}
                          </ul>
                        ) : (
                          <>
                            <ul className="text-base">
                              <span className="font-bold">Empresas:</span>
                              {faq.answer.subtitle.empresas?.map(
                                (item, index) => <li key={index}>• {item}</li>,
                              )}
                            </ul>

                            <ul className="text-base">
                              <span className="font-bold">Pessoa física:</span>
                              {faq.answer.subtitle.pessoaFisica?.map(
                                (item, index) => <li key={index}>• {item}</li>,
                              )}
                            </ul>
                          </>
                        )}
                      </div>
                    </>
                  ) : (
                    typeof faq.answer === 'string' &&
                    faq.answer.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))
                  )}
                </div>
              </div>
            ) : (
              typeof faq.answer === 'string' &&
              faq.answer.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
