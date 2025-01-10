import { Tittle } from '@/components/tittle'
import { HeroFAQ } from './components/hero-faq'
import { FaqContainer } from './components/faqContainer'
import { Button } from '@/components/ui/button'

export default function FAQ() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <HeroFAQ />
      <div className="container mx-auto my-14 flex flex-col gap-14 px-11 2xl:px-40">
        <Tittle>Perguntas frequentes</Tittle>
        <FaqContainer />
        <Button className="mx-auto rounded-xl bg-themeColor px-8 py-6 text-2xl font-bold">
          Ainda tenho dúvidas
        </Button>
      </div>
    </div>
  )
}
