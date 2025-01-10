'use client'
import { useForm, Controller } from 'react-hook-form'
import type { OperacaoProps } from '../page'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import axios from 'axios'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { NumericFormat } from 'react-number-format'

interface NovaOperacaoProps {
  userId: number
  idEmpresa: number
}

const addNewOperacaoSchema = z.object({
  userId: z.number(),
  idEmpresa: z.number(),
  operacao: z
    .string()
    .min(3, 'Por favor, insira o nome da operação com pelo menos 3 caracteres'),
  segmento: z
    .string()
    .transform((value) => value.trim())
    .refine((value) => value !== '', {
      message: 'Por favor, selecione um segmento',
    }),
  volumeOperacao: z.number().min(0, 'Por favor, preencha esse campo'),
})

type AddNewOperacaoSchema = z.infer<typeof addNewOperacaoSchema>

export function NovaOperacao({ userId, idEmpresa }: NovaOperacaoProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddNewOperacaoSchema>({
    resolver: zodResolver(addNewOperacaoSchema),
    defaultValues: {
      userId: 0,
      idEmpresa: 0,
    },
  })

  useEffect(() => {
    if (Number.isInteger(userId) && Number.isInteger(idEmpresa)) {
      reset({ userId, idEmpresa })
    }
  }, [userId, idEmpresa, reset])

  // useEffect(() => {
  //   history.pushState(null, '', window.location.href)

  //   const handlePopState = () => {
  //     window.location.replace(`/usuario/empresas?userId=${userId}`)
  //   }

  //   window.addEventListener('popstate', handlePopState)

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener('popstate', handlePopState)
  //   }
  // }, [userId])

  function handleAddNewOperacao(data: AddNewOperacaoSchema) {
    console.log(data)
    axios
      .post('/api/create-new-op', data, {
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

        if (result.message?.includes('sucesso')) {
          console.log('oi')
          toast.success('Operação criada com sucesso!')
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

    reset()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-themeColor hover:bg-black/80">
          Nova Operação
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Adicionar nova operação</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(handleAddNewOperacao)}
          className="flex flex-col gap-4 py-4"
        >
          <div className="">
            <Label htmlFor="operacao" className="font-bold">
              Nome da Operação
            </Label>
            <Input
              id="operacao"
              className="bg-[#D9D9D9] p-5"
              {...register('operacao')}
            />
            {errors.operacao && (
              <span className="text-xs text-red-600">
                {errors.operacao.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="segmento" className="text-sm font-bold">
              Segmento
            </label>
            <Controller
              name="segmento"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value || ''}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full border bg-[#D9D9D9] py-5">
                    <SelectValue placeholder="Selecione o segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Segmentos</SelectLabel>
                      <SelectItem value="Agropecuária">Agropecuária</SelectItem>
                      <SelectItem value="Imobiliaria">Imobiliária</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.segmento && (
              <p className="text-xs text-red-500">
                Por favor, Selecione um segmento
              </p>
            )}
          </div>

          <div className="">
            <Label htmlFor="volumeOperacao" className="font-bold">
              Volume da Operação:
            </Label>
            <Controller
              name="volumeOperacao"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  id="volumeOperacao"
                  allowNegative
                  prefix="R$ "
                  decimalScale={2}
                  thousandSeparator="."
                  decimalSeparator=","
                  value={field.value}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue || 0)
                  }}
                  className="flex h-9 w-full rounded-md border bg-[#D9D9D9] p-5 px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed md:text-sm"
                />
              )}
            />

            {errors.volumeOperacao && (
              <span className="text-xs text-red-600">
                {errors.volumeOperacao.message}
              </span>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type="submit"
            className="ml-auto bg-themeColor"
          >
            {isSubmitting ? 'Salvando...' : 'Salvar Operação'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
