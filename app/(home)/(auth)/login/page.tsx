import { Tittle } from '@/components/tittle'
import { FormLogin } from './components/form-login'

export default function Login() {
  return (
    <div className="container mx-auto my-14 flex min-h-screen w-full flex-col gap-14">
      <div className="flex flex-col items-center gap-2 text-themeColor">
        <Tittle>Entre no seu perfil</Tittle>
        <span className="text-xl">Informe seus dados de acesso.</span>
      </div>

      <div className="px-40">
        <FormLogin />
      </div>
    </div>
  )
}
