import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text()
    const data = JSON.parse(bodyText)

    console.log('aa', data)

    if (!data) {
      return NextResponse.json(
        { error: 'Dados não fornecidos' },
        { status: 400 },
      )
    }

    const response = await fetch('https://palpiteiro.pro/operacoes2/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseText = await response.text()
    console.log('aq', responseText)

    if (!response.ok) {
      let errorMessage = 'Erro desconhecido'

      try {
        const parsedError = JSON.parse(responseText)
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

    return NextResponse.json({
      message: responseText || 'Operação criada com sucesso',
    })
  } catch (e) {
    console.error('Erro inesperado:', e)
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 },
    )
  }
}
