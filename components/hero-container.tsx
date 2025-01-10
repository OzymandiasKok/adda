import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'

interface HeroContainerProps {
  children: ReactNode
  imageURL: StaticImageData
}

export function HeroContainer({ children, imageURL }: HeroContainerProps) {
  return (
    <>
      <div className="relative flex h-[960px] items-start justify-center 2xl:items-center">
        <div className="relative top-1/4 z-50 flex flex-col items-center justify-center gap-10 text-white 2xl:top-0">
          {children}
        </div>

        <Image
          src={imageURL}
          alt="Wallpapper do office"
          width={1920}
          height={960}
          className="absolute left-0 top-0 z-10 size-full object-cover"
        />
      </div>
    </>
  )
}
