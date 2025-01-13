import logo from '@/app/assets/adda-logo.svg'
import Image from 'next/image'
import { Linkedinicon } from '@/app/assets/linkedin'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-auto flex flex-col bg-themeColor p-10 text-white">
      <div className="container mx-auto flex justify-around">
        <div className="flex flex-col gap-20">
          <Image
            src={logo}
            alt="Logo Adda Partners"
            width={211}
            height={70}
            className=""
          />

          <div className="flex flex-col items-center gap-4">
            <span className="text-xl font-bold">Acesse:</span>
            <ul className="flex flex-col gap-2 text-base">
              <li>
                <Link href="/">Início</Link>
              </li>
              <li>
                <Link href="/sobre">Sobre</Link>
              </li>
              <li>
                <Link href="/parceiros">Parceiros</Link>
              </li>
              <li>
                <Link href="/clientes">Clientes</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex max-w-[400px] flex-col items-end gap-20">
          <p className="text-pretty pl-14 text-xl font-bold">
            &quot;
            <span className="font-normal italic">
              Uma jornada de mil quilômetros precisa começar com um simples
              passo.
            </span>
            &quot; - Lao Tzu
          </p>

          <div className="flex flex-col items-end gap-3">
            <span className="mb-4 text-xl font-bold">Contatos:</span>
            <span className="">Telefone: +55 (35) 3114-0209</span>
            <span className="">Email: contato@addapartners.com.br</span>
            <span className="text-end">
              Endereço: Av Dr. David Beneditto Otonni 252, Jardim dos Estados,
              Poços de Caldas - MG
            </span>
            <a href="https://www.linkedin.com/company/adda-partners/" target="_blank" rel="noopener noreferrer" className="">
              {<Linkedinicon />}
            </a>
          </div>
        </div>
      </div>

      <span className="mx-auto mt-20 text-sm">
        Todos os direitos reservados addapartners@2024{' '}
      </span>
    </footer>
  )
}
