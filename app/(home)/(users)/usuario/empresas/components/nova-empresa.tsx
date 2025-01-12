'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthContext } from '@/app/contexts/auth-context'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

const addNewEmpresaSchema = z.object({
  userId: z.number(),
  razaoSocial: z
    .string()
    .min(3, 'Por favor, insira a razão social com pelo menos 3 caracteres'),
  cnpj: z
    .string()
    .regex(
      /^\d{14}$/,
      'O CNPJ deve conter 14 dígitos numéricos, sem pontos ou traços',
    ),
  email: z.string().email('Por favor, insira um e-mail válido'),
  tel: z
    .string()
    .regex(
      /^[1-9]{2}[9]?[0-9]{8}$/,
      'O telefone deve estar no formato 31999999999(sem espaços)',
    ),
  // status: z.string().optional(),
})

export type AddNewEmpresaSchema = z.infer<typeof addNewEmpresaSchema>

export function NovaEmpresa() {
  const { user } = useAuthContext()

  const {
    register,
    handleSubmit,
    reset,
    // control,
    formState: { errors, isSubmitting },
  } = useForm<AddNewEmpresaSchema>({
    resolver: zodResolver(addNewEmpresaSchema),
    defaultValues: {
      userId: 0,
    },
  })

  useEffect(() => {
    if (user && typeof user.id === 'number') {
      reset({
        userId: user.id,
      })
    }
  }, [user, reset])

  // useEffect(() => {
  //   history.pushState(null, '', window.location.href)

  //   const handlePopState = () => {
  //     window.location.replace('/')
  //   }

  //   window.addEventListener('popstate', handlePopState)

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener('popstate', handlePopState)
  //   }
  // }, [])

  function handleAddNewEmpresa(data: AddNewEmpresaSchema) {
    console.log(data)
    axios
      .post('/api/create-new-empresa', data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        let result = response.data

        if (typeof result.message === 'string') {
          result = JSON.parse(result.message)
        }

        console.log('aq', result)

        if (result.error) {
          console.error('Erro ao registrar:', result.error)
          toast.error(result.error)
        }

        if (result.message === 'Empresa salva com sucesso!') {
          reset()
          toast.success('Empresa criada com sucesso!')
          setTimeout(() => {
            window.location.reload()
          }, 1000)
        }
      })
      .catch((error) => {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error.response)
          const errorResponse = error.response.data
          const errorMessage =
            errorResponse.error ||
            'Ocorreu um erro ao enviar os dados. Tente novamente.'

          console.error('Erro na requisição:', errorResponse)

          toast.error(errorMessage)
        } else {
          console.error('Erro inesperado:', (error as Error).message)
          toast.error('Ocorreu um erro ao enviar os dados. Tente novamente.')
        }
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-themeColor hover:bg-black/80">
          Nova Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Adicionar nova empresa</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleAddNewEmpresa)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="">
            <Label htmlFor="razaoSocial" className="font-bold">
              Razão Social:
            </Label>
            <Input
              id="razaoSocial"
              className="bg-[#D9D9D9] p-5"
              {...register('razaoSocial')}
            />
            {errors.razaoSocial && (
              <span className="text-xs text-red-600">
                {errors.razaoSocial.message}
              </span>
            )}
          </div>

          <div className="">
            <Label htmlFor="cnpj" className="font-bold">
              CNPJ:
            </Label>
            <Input
              id="cnpj"
              className="bg-[#D9D9D9] p-5"
              {...register('cnpj')}
            />
            {errors.cnpj && (
              <span className="text-xs text-red-600">
                {errors.cnpj.message}
              </span>
            )}
          </div>

          <div className="">
            <Label htmlFor="email" className="font-bold">
              E-mail:
            </Label>
            <Input
              id="email"
              className="bg-[#D9D9D9] p-5"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-xs text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex items-start gap-3">
            <div className="w-full">
              <Label htmlFor="tel" className="font-bold">
                Telefone:
              </Label>
              <Input
                id="tel"
                className="bg-[#D9D9D9] p-5"
                {...register('tel')}
              />
              {errors.tel && (
                <span className="text-xs text-red-600">
                  {errors.tel.message}
                </span>
              )}
            </div>

            {/* <div className="mt-1 flex w-full flex-col justify-start">
              <Label className="mb-2 font-bold">Status:</Label>
              <Controller
                name="status"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                  return (
                    <Select
                      defaultValue="Analise"
                      name={name}
                      onValueChange={onChange}
                      value={value}
                      disabled={disabled}
                    >
                      <SelectTrigger className="h-10 bg-[#D9D9D9] px-3 py-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Analise">Análise</SelectItem>
                        <SelectItem value="Pronto">Pronto</SelectItem>
                      </SelectContent>
                    </Select>
                  )
                }}
              ></Controller>
            </div> */}
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className="ml-auto bg-themeColor"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Empresa'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
