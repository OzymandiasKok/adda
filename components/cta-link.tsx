'use client'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface CTALinkProps {
  path: string
  text: string
  type: 'hero' | 'body' | 'outline' | 'body2' | 'body3' | 'outline2'
}

const typeStyles = {
  hero: 'h-[81px] min-w-[300px] px-4 bg-white text-themeColor text-4xl',
  body: 'bg-themeColor px-10 py-3 text-white text-4xl',
  body2: 'bg-themeColor px-8 py-4 text-white text-2xl',
  body3: 'bg-themeColor py-4 px-8 uppercase text-white text-xl',
  outline: 'text-2xl border-2 border-themeColor px-10 py-3 text-themeColor',
  outline2: 'text-2xl border-2 border-white px-10 py-3 text-white text-4xl',
}

export function CTALink({ path, text, type }: CTALinkProps) {
  return (
    <Link
      href={path}
      className={twMerge(
        typeStyles[type],
        'flex items-center justify-center rounded-lg font-bold transition-all hover:bg-themeColor hover:text-white',
      )}
    >
      {text}
    </Link>
  )
}
