import { Tittle } from '@/components/tittle'
import { FormRegister } from './components/form-register'

export default function Register() {
  return (
    <div className="container mx-auto my-14 flex min-h-screen w-full flex-col gap-14">
      <div className="flex flex-col items-center gap-2 text-themeColor">
        <Tittle>Crie sua conta</Tittle>
      </div>

      <div className="px-40">
        <FormRegister />
      </div>
    </div>
  )
}
