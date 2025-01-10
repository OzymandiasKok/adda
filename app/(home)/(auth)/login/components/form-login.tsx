'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const formLoginSchema = z.object({
  email: z.string().email('Por favor, informe um e-mail válido'),
  password: z
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
      'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número.',
    ),
})

type FormLoginSchema = z.infer<typeof formLoginSchema>

export function FormLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
  })

  function handleLogin(data: FormLoginSchema) {
    axios
      .post('/api/login', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        const result = response.data

        if (result.error) {
          console.error('Erro no login:', result.error)
          toast.error(result.error)
          return
        }

        if (result.data) {
          document.cookie = `@adda-partners:token=${result.data}; path=/; secure; SameSite=Strict`
          toast.success(
            'Login feito com sucesso! Você vai ser redirecionado em poucos segundos.',
          )
          setTimeout(() => {
            router.push('/')
          }, 1000)
        } else {
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

          if (errorResponse.error) {
            toast.error('Email ou senha incorreta')
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
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col gap-5"
      >
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

        <div className="flex justify-between">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="flex-1 bg-themeColor p-5 text-base"
          >
            {isSubmitting ? 'Carregando...' : 'Entrar'}
          </Button>
        </div>
      </form>

      <span className="">
        Ainda não possui uma conta?
        <a href="/registrar" className="font-bold">
          {' '}
          Cadastre-se agora!
        </a>
      </span>
    </Card>
  )
}
