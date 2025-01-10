'use client'

import { useAuthContext } from '@/app/contexts/auth-context'
import { SheetMenu } from './sheet-menu'
import { useEffect, useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import Link from 'next/link'

export function StateContainer() {
  const { login } = useAuthContext()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex h-[53px] w-[150px] items-center justify-center">
        <LoaderCircle className="size-4 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="flex w-[150px] items-center">
      {login ? (
        <div className="w-[150px]">
          <SheetMenu />
        </div>
      ) : (
        <Link
          href="/login"
          className="h-full text-wrap rounded-lg bg-white px-3 py-2 text-center text-base font-semibold text-themeColor hover:bg-white/80"
        >
          Acesse sua conta
        </Link>
      )}
    </div>
  )
}
