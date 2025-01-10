import { HeroSobre } from './components/hero-sobre'
import { SobreNos } from './components/sobre-nos'

export default function Sobre() {
  return (
    <div className="flex min-h-screen w-full flex-col gap-14">
      <HeroSobre />
      <SobreNos />
    </div>
  )
}
