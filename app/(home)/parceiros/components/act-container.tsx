import pattern from '@/app/assets/pattern.png'
import Image from 'next/image'
import { CTALink } from '@/components/cta-link'

export function ActContainer() {
  return (
    <div className="relative w-full overflow-hidden py-20">
      <div className="relative z-40 flex flex-col items-center justify-center gap-8 p-32 2xl:container 2xl:mx-auto">
        <h2 className="text-balance text-center text-5xl font-bold uppercase text-themeColor 2xl:w-[40%]">
          Se torne um parceiro Adda
        </h2>
        <span className="w-[80%] text-balance text-center text-3xl text-themeColor xl:w-[60%]">
          Faça operações de crédito para seus clientes de maneira simplificada e
          rápida
        </span>

        <CTALink path="/registrar" text="Cadastre-se" type="body" />
      </div>
      <Image
        src={pattern}
        alt="pattern"
        width={500}
        height={750}
        className="absolute -left-1 bottom-0 top-0 z-10 w-full opacity-35"
      />
    </div>
  )
}
