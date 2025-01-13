'use client'
import { useTablesContext } from '@/app/contexts/tables-context'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

export function SaveData() {
  const { tableGroup } = useTablesContext()
  const [isLoading, setIsLoading] = useState(false)

  const handleSaveTables = () => {
    console.log('Dados enviados:', tableGroup)  // Log dos dados antes de enviar
    setIsLoading(true)

    fetch('https://palpiteiro.pro/api/tabela/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableGroup),
    })
      .then((response) => {
        console.log('Resposta da requisição:', response)  // Log da resposta
        if (!response.ok) {
          throw new Error('Erro ao salvar dados')
        }
        return response.json()
      })
      .then((data) => {
        console.log('Dados recebidos do backend:', data)  // Log dos dados recebidos
        toast.success('Dados salvos com sucesso!')
      })
      .catch((error) => {
        console.error('Erro na requisição:', error)  // Log de erro completo
        toast.error(
          'Houve um erro ao tentar salvar, tente novamente ou contate o suporte.',
        )
      })
      .finally(() => {
        localStorage.removeItem('@adda-partners:tables')
        // window.location.reload()
        setIsLoading(false)
      })
  }

  return (
    <Button
      onClick={handleSaveTables}
      className="absolute right-1 bg-themeColor"
      disabled={isLoading}
    >
      {isLoading ? 'Salvando...' : 'Salvar dados'}
    </Button>
  )
}
