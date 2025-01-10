'use client'
import { priceFormatter } from '@/lib/priceFormatter'
import { useState, useEffect, useRef, useCallback } from 'react'

export function OpCount() {
  const [opQtd, setOpQtd] = useState(0)
  const [amount, setAmount] = useState(0)
  const [actTime, setActTime] = useState(0)
  const [startCounting, setStartCounting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top < windowHeight * 0.9 && rect.bottom > 0) {
        setStartCounting(true)
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    let opQtdInterval: NodeJS.Timeout
    let amountInterval: NodeJS.Timeout
    let actTimeInterval: NodeJS.Timeout

    if (startCounting) {
      opQtdInterval = setInterval(() => {
        setOpQtd((prev) => {
          if (prev < 18) return prev + 1
          clearInterval(opQtdInterval)
          return prev
        })
      }, 10)

      amountInterval = setInterval(() => {
        setAmount((prev) => {
          if (prev < 180000000) return prev + 100000
          clearInterval(amountInterval)
          return prev
        })
      }, 5)

      actTimeInterval = setInterval(() => {
        setActTime((prev) => {
          if (prev < 5) return prev + 1
          clearInterval(actTimeInterval)
          return prev
        })
      }, 10)
    }

    return () => {
      clearInterval(opQtdInterval)
      clearInterval(amountInterval)
      clearInterval(actTimeInterval)
    }
  }, [startCounting])

  return (
    <div className="bg-white">
      <div
        ref={sectionRef}
        className="container mx-auto mt-8 flex justify-between gap-5 px-5 py-16"
      >
        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#E7E7E7] font-bold text-themeColor">
          <span className="w-[80%] text-balance text-center text-2xl leading-[44px]">
            Número de Operações
          </span>
          <span className="text-4xl 2xl:text-5xl">+{opQtd}</span>
        </div>

        <div className="flex min-w-[400px] flex-1 flex-col items-center justify-center gap-5 rounded-lg bg-[#E7E7E7] p-6 font-bold text-themeColor">
          <span className="w-[80%] text-balance text-center text-2xl leading-[44px]">
            Total Captado
          </span>
          <span className="text-xl">
            <span className="text-4xl 2xl:text-5xl">
              {priceFormatter(amount)}
            </span>
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 rounded-lg bg-[#E7E7E7] p-6 font-bold text-themeColor">
          <span className="w-[80%] text-balance text-center text-2xl leading-[44px]">
            Tempo de Atuação
          </span>
          <span className="text-4xl 2xl:text-5xl">{actTime} Anos</span>
        </div>
      </div>
    </div>
  )
}
