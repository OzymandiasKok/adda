import { type ReactNode } from 'react'

export function Tittle({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <h2 className="w-full text-center text-5xl font-bold leading-10 text-themeColor">
        {children}
      </h2>
    </div>
  )
}
