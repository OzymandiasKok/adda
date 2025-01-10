'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tittle } from '@/components/tittle'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/app/contexts/auth-context'
import axios from 'axios'
import { verifyPassword } from '@/app/utils/criptografia'
import { toast } from 'sonner'

const userDataSchema = z
  .object({
    name: z.string().min(8, 'Por favor, insira seu nome completo'),
    cpf: z
      .string()
      .min(11, 'Por favor, informe um CPF válido, sem pontos e traços')
      .max(11, 'Por favor, informe um CPF válido, sem pontos e traços'),
    email: z
      .string()
      .email('Por favor, informe um e-mail válido')
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Por favor, informe um e-mail válido',
      ),
    telefone: z
      .string()
      .regex(
        /^[1-9]{2}[9][0-9]{8}$/,
        'O número deve estar no formato 19 9 9999 9999 (sem espaços)',
      ),
    nascimento: z
      .string()
      .regex(
        /^((0[1-9]|1[0-9]|2[0-8])\/(0[1-9]|1[012])|(29|30|31)\/(0[13578]|1[02])|(29|30)\/(0[469]|11))\/(19|[2-9][0-9])\d\d|29\/02\/(19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$/,
        'A data deve estar no formato DD/MM/AAAA e ser válida.',
      ),
    currentPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres'),
    newPassword: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
        'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })

type UserDataSchema = z.infer<typeof userDataSchema>

export default function DadosCadastrais() {
  const { user } = useAuthContext()

  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserDataSchema>({
    resolver: zodResolver(userDataSchema),
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        cpf: '',
        email: user.email,
        telefone: user.telefone,
        nascimento: '',
        currentPassword: '',
      })
    }
  }, [user, reset])

  async function handleUserData(data: UserDataSchema) {
    if (user) {
      const verifiedPassword = await verifyPassword(
        data.currentPassword,
        user.password,
      )

      if (!verifiedPassword) {
        setError('currentPassword', {
          type: 'manual',
          message: 'A senha atual não está correta.',
        })
      } else {
        const response = await axios.post('/api/update-user-data', data, {
          headers: { 'Content-Type': 'application/json' },
        })

        const result = response.data

        if (
          typeof result.message === 'string' &&
          result.message.includes('sucesso')
        ) {
          toast.success('Dados alterados com sucesso!')
        }
      }
    }
  }

  return (
    <div className="my-14 flex flex-col gap-14">
      <Tittle>Dados cadastrais</Tittle>

      <form
        onSubmit={handleSubmit(handleUserData)}
        className="border-box container mx-auto flex flex-col gap-5 rounded-xl border px-40 py-11"
      >
        <div className="w-full">
          <Label htmlFor="name" className="font-bold">
            Nome Completo
          </Label>
          <Input id="name" className="bg-[#D9D9D9] p-5" {...register('name')} />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </div>

        <div className="flex gap-5">
          <div className="w-full">
            <Label htmlFor="cpf" className="font-bold">
              CPF
            </Label>
            <Input id="cpf" className="bg-[#D9D9D9] p-5" {...register('cpf')} />
            {errors.cpf && (
              <span className="text-xs text-red-600">{errors.cpf.message}</span>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="nascimento" className="font-bold">
              Nascimento
            </Label>
            <Input
              id="nascimento"
              className="bg-[#D9D9D9] p-5"
              {...register('nascimento')}
            />
            {errors.nascimento && (
              <span className="text-xs text-red-600">
                {errors.nascimento.message}
              </span>
            )}
          </div>
        </div>

        <div className="">
          <Label htmlFor="telefone" className="font-bold">
            Telefone de Contato:
          </Label>
          <Input
            id="telefone"
            type="tel"
            className="bg-[#D9D9D9] p-5"
            {...register('telefone')}
          />
          {errors.telefone && (
            <span className="text-xs text-red-600">
              {errors.telefone.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="email" className="font-bold">
            E-mail
          </Label>
          <Input
            id="email"
            className="bg-[#D9D9D9] p-5"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="currentPassword" className="font-bold">
            Senha atual
          </Label>
          <div className="relative">
            <Input
              id="currentPassword"
              type={showPassword ? 'text' : 'password'}
              className="bg-[#D9D9D9] p-5"
              {...register('currentPassword')}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              className="absolute right-2 top-3"
            >
              {showPassword ? (
                <EyeOff className="size-5 opacity-60" />
              ) : (
                <Eye className="size-5 opacity-60" />
              )}
            </button>
          </div>

          {errors.currentPassword && (
            <span className="text-xs text-red-600">
              {errors?.currentPassword.message}
            </span>
          )}
        </div>

        <div className="">
          <Label htmlFor="newPassword" className="font-bold">
            Nova senha
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? 'text' : 'password'}
              className="bg-[#D9D9D9] p-5 placeholder:text-sm"
              placeholder="Exemplo: Senha1234"
              {...register('newPassword')}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              className="absolute right-2 top-3"
            >
              {showPassword ? (
                <EyeOff className="size-5 opacity-60" />
              ) : (
                <Eye className="size-5 opacity-60" />
              )}
            </button>
            {errors.newPassword && (
              <span className="text-xs text-red-600">
                {errors?.newPassword.message}
              </span>
            )}
          </div>
          <ul className="flex flex-col text-xs">
            <span className="my-2 font-semibold">A senha precisa ter:</span>
            <li>• Pelo menos 8 caracteres</li>
            <li>• Pelo menos 1 letra maiúscula e 1 letra minúscula</li>
            <li>• Pelo menos um número</li>
          </ul>
        </div>

        <div className="">
          <Label htmlFor="confirmPassword" className="font-bold">
            Confirmar senha
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              className="bg-[#D9D9D9] p-5"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              className="absolute right-2 top-3"
            >
              {showPassword ? (
                <EyeOff className="size-5 opacity-60" />
              ) : (
                <Eye className="size-5 opacity-60" />
              )}
            </button>
            {errors.confirmPassword && (
              <span className="text-xs text-red-600">
                {errors?.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="mx-auto flex-1 bg-themeColor px-10 text-base"
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Dados'}
        </Button>
      </form>
    </div>
  )
}
