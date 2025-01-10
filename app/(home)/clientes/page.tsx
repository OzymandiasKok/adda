import { HeroClientes } from './components/hero-clientes'
import { OperationsContainer } from './components/operations-container'
import { OurProcess } from './components/our-process'

export default function Clientes() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <HeroClientes />
      <div className="container mx-auto">
        <OurProcess />
        <OperationsContainer />
      </div>
    </div>
  )
}
