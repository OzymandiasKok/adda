import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const bodyText = await req.text()
  const data = JSON.parse(bodyText)

  if (!data) {
    return NextResponse.json({ error: 'Dados não fornecidos' }, { status: 400 })
  }

  const { email, password } = data

  const userData = { email, password }

  console.log(userData)

  const response = await fetch(
    'https://palpiteiro.pro/auth/verificar-senha/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    },
  )

  console.log('aq', response)

  if (!response.ok) {
    const error = await response.text()
    let errorMessage = 'Erro desconhecido'

    try {
      const parsedError = JSON.parse(error)
      if (parsedError.message) {
        errorMessage = parsedError.message
      }
    } catch (e) {
      console.error('Erro ao processar a mensagem de erro:', e)
    }

    console.error('Erro ao enviar os dados para a API externa:', errorMessage)

    return NextResponse.json(
      { error: errorMessage },
      { status: response.status },
    )
  }

  const result = await response.json()
  console.log('Dados recebidos:', result)

  return NextResponse.json({
    message: 'Dados salvos com sucesso',
    data: result.access_token,
  })
}
