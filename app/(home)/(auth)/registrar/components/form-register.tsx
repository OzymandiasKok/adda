'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const formRegisterSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(8, 'Por favor, insira seu nome completo'),
  email: z.string().email('Por favor, informe um e-mail válido'),
  telefone: z
    .string()
    .regex(
      /^[1-9]{2}[9][0-9]{8}$/,
      'O número deve estar no formato 31999999999(sem espaços)',
    ),
  empresa: z.string().min(5, 'Por favor, insira o nome da empresa'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.',
    ),
})

type FormRegisterSchema = z.infer<typeof formRegisterSchema>

export function FormRegister() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
  })

  function handleRegister(data: FormRegisterSchema) {
    axios
      .post('/api/register', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        const result = response.data

        if (result.error) {
          console.error('Erro ao registrar:', result.error)
          toast.error(result.error)
          return
        }

        if (result.data) {
          document.cookie = `@adda-partners:token=${result.data}; path=/; secure; SameSite=Strict`;
          toast.success(
            'Login feito com sucesso! Você vai ser redirecionado em poucos segundos.',
          );
          setTimeout(() => {
            router.replace('https://addapartners.com.br');
            window.location.reload();
          }, 1000);
        }
        
        
        else {
          console.error('Token não encontrado na resposta')
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          const errorResponse = error.response.data
          const errorMessage =
            errorResponse.error ||
            'Ocorreu um erro ao enviar os dados. Tente novamente.'

          console.error('Erro na requisição:', errorResponse)

          if (errorResponse.error?.includes('e-mail já é cadastrado')) {
            toast.error('Este e-mail já está cadastrado.')
          } else {
            toast.error(errorMessage)
          }
        } else {
          console.error('Erro inesperado:', (error as Error).message)
          toast.error('Ocorreu um erro ao enviar os dados. Tente novamente.')
        }
      })
  }

  return (
    <Card className="mx-auto flex w-[550px] flex-col gap-5 px-16 py-10 shadow-md">
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex flex-col gap-5"
      >
        <div className="">
          <Label htmlFor="name" className="font-bold">
            Nome Completo:
          </Label>
          <Input id="name" className="bg-[#D9D9D9] p-5" {...register('name')} />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="email" className="font-bold">
            Email
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
          <Label htmlFor="password" className="font-bold">
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className="bg-[#D9D9D9] p-5"
              {...register('password')}
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

          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
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

        <div className="">
          <Label htmlFor="empresa" className="font-bold">
            Empresa:
          </Label>
          <Input
            id="empresa"
            className="bg-[#D9D9D9] p-5"
            {...register('empresa')}
          />
          {errors.empresa && (
            <span className="text-xs text-red-600">
              {errors.empresa.message}
            </span>
          )}
        </div>

        {/* <div className="">
          <Label htmlFor="password" className="font-bold">
            Senha
          </Label>
          <Input
            id="password"
            className="bg-[#D9D9D9] p-5"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
          )}
        </div> */}

        <Button
          disabled={isSubmitting}
          type="submit"
          className="mx-auto flex-1 bg-themeColor px-10 text-base"
        >
          {isSubmitting ? 'Criando...' : 'Criar conta'}
        </Button>
      </form>

      <span className="text-center">
        Já possui uma conta?
        <a href="/login" className="font-bold">
          {' '}
          Faça Login
        </a>
      </span>
    </Card>
  )
}
