'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import grega from '@/app/assets/partner-grega.jpeg'
import avatar1 from '@/app/assets/avatar-1.jpg'
import avatar2 from '@/app/assets/avatar-2.jpg'
import avatar3 from '@/app/assets/avatar-3.jpg'

import UseMedia from '@/app/hooks/useMedia'

const feedbacks = [
  {
    avatarImg: grega,
    name: 'Gabriela Miranda Squarsado',
    description: 'Sócia Administradora da Grega Incorporadora e Construtora',
    text: 'A parceria com a ADDA Partners tem sido um dos pilares para o sucesso da nossa expansão. Com uma abordagem estratégica e personalizada, a ADDA trouxe soluções que nos permitiram transformar desafios em oportunidades reais.',
  },
  {
    avatarImg: avatar2,
    name: 'Ana Beatriz Floriano',
    description: 'Proprietária da Fazenda 5 Corações',
    text: 'Contar com a ADDA Partners foi essencial para estruturarmos nossos projetos financeiros. Eles nos ajudaram a implementar soluções que geraram resultados concretos e sustentáveis.',
  },
  {
    avatarImg: avatar3,
    name: 'Gerson Almeida',
    description: 'Proprietário da Fazenda 4 Corações',
    text: 'A expertise da ADDA Partners foi fundamental para alavancarmos nossa operação. A clareza nas estratégias e o acompanhamento próximo fizeram toda a diferença no nosso crescimento.',
  },
  {
    avatarImg: avatar1,
    name: 'Robert Barbosa',
    description: 'Proprietário da Fazenda 3 Corações',
    text: 'A ADDA Partners nos trouxe segurança e confiança para tomar decisões importantes em momentos críticos. O suporte deles foi um divisor de águas para nossa empresa.',
  },
  {
    avatarImg: avatar2,
    name: 'Ana Beatriz Floriano',
    description: 'Proprietária da Fazenda 2 Corações',
    text: 'Trabalhar com a ADDA Partners nos deu a possibilidade de enxergar novas oportunidades no mercado. Eles têm um olhar inovador que faz toda a diferença na tomada de decisões.',
  },
  {
    avatarImg: avatar3,
    name: 'Gerson Almeida',
    description: 'Proprietário da Fazenda 1 Coração',
    text: 'Com a ajuda da ADDA Partners, conseguimos estruturar nossos negócios de maneira eficiente e profissional. O impacto dessa parceria pode ser visto nos resultados que alcançamos.',
  },
]

export function FeedbacksCarousel() {
  const is2XL = UseMedia('(min-width: 1536px)')

  return (
    <div className="container mx-auto mt-24">
      <Swiper
        spaceBetween={is2XL ? 100 : 35}
        slidesPerView={'auto'}
        modules={[Navigation, A11y]}
        navigation={true}
        centeredSlides={false}
        style={{ '--swiper-navigation-size': '30px' } as React.CSSProperties}
      >
        {feedbacks.map((card, i) => (
          <SwiperSlide className="max-w-[420px] pb-5" key={i}>
            <Card className="flex h-[600px] w-[420px] flex-col items-center rounded-3xl p-14 shadow-lg">
              <Avatar className="size-16">
                <AvatarImage src={card.avatarImg.src} />
                <AvatarFallback>
                  {card.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="mt-8 flex flex-col gap-2 text-center">
                <span className="text-2xl font-bold">{card.name}</span>
                <span className="text-base">{card.description}</span>
              </div>
              <span className="mt-5 text-balance text-base 2xl:text-xl">
                {card.text}
              </span>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
