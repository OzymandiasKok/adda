'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tittle } from '../tittle'
import { CTALink } from '../cta-link'

const faqs = [
  {
    question: 'O que é um CRI/CRA?',
    answer:
      'São certificados de recebíveis imobiliários e agropecuários, respectivamente. Títulos de crédito de emissão exclusiva por securitizadoras e títulos de renda fixa.',
  },

  {
    question: 'Qual o papel da ADDA?',
    answer:
      'A ADDA atua no processo como um todo, desde o começo da originação até a fase de distribuição juntamente com investidores da nossa base.',
  },

  {
    question: 'Quem a ADDA atende?',
    answer:
      'O foco da ADDA está em pequenas e médias empresas dos setores agropecuário e imobiliário.',
  },
]

export function FAQ() {
  return (
    <div className="container mx-auto mb-20 mt-14 px-5">
      <div className="container mx-auto mt-14 flex flex-col px-11 2xl:pr-16">
        <Tittle>FAQ</Tittle>
        <div className="my-14">
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
                <AccordionContent className="text-lg font-normal 2xl:text-xl">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mr-auto mt-10">
          <CTALink path="/faq" text="Mais dúvidas?" type="body2" />
        </div>
      </div>
    </div>
  )
}
