'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import { Card } from '@/components/ui/card'

import opBg1 from '@/app/assets/opBg1.jpeg'
import opBg2 from '@/app/assets/opBg2.jpeg'
import Image from 'next/image'
import UseMedia from '@/app/hooks/useMedia'

const operations = [
  {
    headerTitle: 'Mercado Imobiliario',
    headerImg: opBg1,
    tittle: 'CRI - Marcillio Judice',
    opValue: '15.000.000,00',
    types: [
      'Estruturadora - ADDA',
      'Securitizadora: Blox',
      'Depositária - Laqus',
    ],
    descriptions: [
      'Taxa: CDI +6,5%',
      'Prazo: 36 meses',
      'Amortização: Bullet com PMT’s mensais',
      'Garantia: Cessão os recebíveis + A.F. do empreendimento',
    ],
  },

  {
    headerTitle: 'Agronegócio',
    headerImg: opBg2,
    tittle: 'CPR - Fazenda Nossa Senhora Aparecida',
    opValue: '11.000.000,00',
    types: ['Originadora - ADDA', 'Tomador - Ceres Investimentos'],
    descriptions: [
      'Taxa: CDI +6,5%',
      'Prazo: 5 anos',
      'Amortização: PMT’s semestrais',
      'Garantia: A.F. das matrículas + Penhor dos grãos',
    ],
  },

  {
    headerTitle: 'Agronegócio',
    headerImg: opBg2,
    tittle: 'CPR - Fazenda Nossa Senhora Aparecida',
    opValue: '6.500.000,00',
    types: ['Estruturadora - ADDA', 'Tomador - Investidores Próprios'],
    descriptions: [
      'Taxa: CDI +9%',
      'Prazo: 5 anos',
      'Amortização: PMT’s semestrais',
      'Garantia: A.F. das matrículas + Penhor dos grãos',
    ],
  },

  {
    headerTitle: 'Mercado Imobiliário',
    headerImg: opBg1,
    tittle: 'CRI - Barbosa Incorporadora',
    opValue: '20.000.000,00',
    types: ['Originadora - ADDA', 'Tomador - Urca Capital'],
    descriptions: [
      'Taxa: IPCA +12,89%',
      'Prazo: 40 meses',
      'Amortização: PMT’s mensais',
      'Garantia: Cessão dos recebíveis + A.F. do empreendimento',
    ],
  },

  {
    headerTitle: 'Mercado Imobiliário',
    headerImg: opBg1,
    tittle: 'CPR - Residencial Lutfalla Sabbag',
    opValue: '2.700.000,00',
    types: ['Estruturadora - ADDA', 'Tomador - Growth Securitizadora'],
    descriptions: [
      'Taxa: 1,5% ao mês',
      'Prazo: 30 meses',
      'Amortização: PMT’s mensais',
      'Garantia: Cessão dos recebíveis + A.F. do empreendimento',
    ],
  },

  {
    headerTitle: 'Mercado Imobiliario',
    headerImg: opBg1,
    tittle: 'CRI - ICA',
    opValue: '30.000.000,00',
    types: ['Originadora - ADDA', 'Tomador: Suno S.A.'],
    descriptions: [
      'Taxa: CDI +6%',
      'Prazo: 5 Anos',
      'Amortização: Bullet com PMT’s mensais',
      'Garantia: Cessão os recebíveis + A.F. do empreendimento',
    ],
  },

  {
    headerTitle: 'Agronegócio',
    headerImg: opBg2,
    tittle: 'CRA - Samuel',
    opValue: '40.000.000,00',
    types: ['Originadora - ADDA', 'Tomador - Institucional'],
    descriptions: [
      'Taxa: IPCA +7%',
      'Prazo: 5 Anos',
      'Amortização: PMT’s anuais',
      'Garantia: A.F. das matrículas + Penhor dos grãos',
    ],
  },

  {
    headerTitle: 'Agronegócio',
    headerImg: opBg2,
    tittle: 'CRA - Guiomar',
    opValue: '20.000.000,00',
    types: ['Originadora - ADDA', 'Tomador - Ceres Investimentos'],
    descriptions: [
      'Taxa: IPCA +6,5%',
      'Prazo: 5 Anos',
      'Amortização: PMT’s anuais',
      'Garantia: A.F. das matrículas + Penhor dos grãos',
    ],
  },

  {
    headerTitle: 'Mercado Imobiliário',
    headerImg: opBg1,
    tittle: 'CRI - Construtora Pardini',
    opValue: '10.000.000,00',
    types: ['Originadora - ADDA', 'Tomador - Urca Capital'],
    descriptions: [
      'Taxa: IPCA + 12,50%',
      'Prazo: 40 meses',
      'Amortização: PMT’s mensais',
      'Garantia: Cessão dos recebíveis + A.F. do empreendimento',
    ],
  },
]

export function Carousel() {
  const is2XL = UseMedia('(min-width: 1536px)')
  return (
    <div className="container mx-auto mt-24">
      <Swiper
        spaceBetween={is2XL ? 150 : 35}
        slidesPerView={'auto'}
        modules={[Navigation, A11y]}
        navigation={true}
        centeredSlides={false}
        style={{ '--swiper-navigation-size': '30px' } as React.CSSProperties}
      >
        {operations.map((card, i) => (
          <SwiperSlide className="max-w-[420px] pb-5" key={i}>
            <Card className="flex h-[600px] w-[420px] flex-col items-center overflow-hidden rounded-3xl border-2 pb-5 shadow-lg">
              <div className="relative z-20 flex h-[120px] w-full items-center justify-center">
                <span className="absolute z-50 rounded-md bg-black/70 px-3 text-2xl font-bold leading-9 text-white">
                  {card.headerTitle}
                </span>
                <Image
                  src={card.headerImg}
                  alt="wallpaper da operação"
                  width={657}
                  height={195}
                  className="left-0 top-0 size-full object-cover"
                />
              </div>

              <div className="mt-8 flex flex-col items-center px-5">
                <span className="w-[80%] text-center text-2xl font-bold">
                  {card.tittle}
                </span>

                <div className="mt-8 flex flex-col items-center gap-3 text-center">
                  <div className="flex flex-col">
                    <span className="text-xl">Valor da operação</span>
                    <span className="text-3xl font-bold leading-[58px]">
                      R${card.opValue}
                    </span>

                    {card.types.map((type) => (
                      <span
                        key={type}
                        className="text-base font-bold leading-[29px]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex flex-col gap-1">
                    {card.descriptions.map((descript) => (
                      <span key={descript} className="text-base leading-[29px]">
                        {descript}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}

        {/* <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide> */}
      </Swiper>
    </div>
  )
}
