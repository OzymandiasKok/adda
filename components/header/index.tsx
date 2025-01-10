'use client'
import logo from '@/app/assets/adda-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { StateContainer } from './components/state-container'
import { usePathname } from 'next/navigation'

const menus = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Sobre',
    href: '/sobre',
  },
  {
    label: 'Parceiros',
    href: '/parceiros',
  },
  {
    label: 'Clientes',
    href: '/clientes',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="z-50 bg-themeColor">
      <div className="container mx-auto flex items-center justify-between gap-5 px-5">
        <div className="flex min-h-[111px] items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="logo from adda partners"
              width={211}
              height={70}
              className="object-cover"
            />
          </Link>
        </div>

        <nav className="">
          <ul className="flex gap-5 p-2 text-white">
            {menus.map((menu, i) => (
              <li
                key={i}
                className={menu.href === pathname ? 'border-b-2 font-bold' : ''}
              >
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <StateContainer />
      </div>
    </header>
  )
}
