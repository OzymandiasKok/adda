'use client'

import { useAuthContext } from '@/app/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar'
import Link from 'next/link'

export function SheetMenu() {
  const { user } = useAuthContext()

  const name = user?.name
    ? user.name.toLowerCase().split(' ').slice(0, 1).join(' ')
    : ''

  if (!user) {
    return <div className="">Carregando...</div>
  }

  return (
    <Menubar className="flex justify-center">
      <MenubarMenu>
        <MenubarTrigger className="w-full overflow-hidden truncate whitespace-nowrap px-0 text-center text-base font-semibold capitalize">
          <span className="min-w-full">Olá, {name}!</span>
        </MenubarTrigger>
        <MenubarContent className="flex w-[151px] min-w-[14rem] flex-col gap-2 border-emerald-950 bg-themeColor text-white shadow-xl">
          {/* <div className="flex Spr-3">
            <Badge
              variant="secondary"
              className="ml-auto rounded-full bg-[#56676F] text-white"
            >
              Parceiro
            </Badge>
          </div> */}

          {/* <div className="flex items-center gap-3 p-5 pl-3 text-white">
            <div className="flex gap-1">
              <User className="size-10 rounded-full bg-white/10 p-2" />
              <span className="min-w-[4rem] truncate text-ellipsis border text-sm">
                {user?.name}
              </span>
            </div>
          </div> */}
          <MenubarItem>
            <Link href="/usuario/dados-cadastrais" className="w-full">
              Dados do usuário
            </Link>
          </MenubarItem>
          <MenubarItem>
            <Link
              href={`/usuario/empresas?userId=${user.id}`}
              className="w-full"
            >
              Empresas
            </Link>
          </MenubarItem>
          {/* <MenubarItem>Operações</MenubarItem> */}
          {/* <MenubarSeparator className="bg-white/30" /> */}
          {/* <MenubarItem className="focus:bg-transarent">
            <Button className="mx-auto border border-white/60 bg-transparent hover:bg-white hover:text-themeColor">
              Nova Empresa
            </Button>
          </MenubarItem> */}
          {/* <MenubarSeparator className="bg-white/30" /> */}
          {/* <MenubarItem>Sair</MenubarItem> */}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
