'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const ConfirmEmail = () => {
  const params = useParams()  // Acessa os parâmetros da URL diretamente
  const [status, setStatus] = useState<string | null>('Carregando...')

  // Captura o token diretamente do parâmetro da URL
  const token = params.token as string | undefined

  useEffect(() => {
    if (token) {
      fetch(`https://palpiteiro.pro/email/confirm-email/${token}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setStatus('Erro ao confirmar o e-mail')
          } else {
            setStatus('E-mail confirmado com sucesso!')
          }
        })
        .catch(() => {
          setStatus('Erro de rede ao tentar confirmar o e-mail')
        })
    } else {
      setStatus('Token não encontrado.')
    }
  }, [token])

  return (
    <div>
      <h1>Confirmação de E-mail</h1>
      <p>{status}</p>
    </div>
  )
}

export default ConfirmEmail
