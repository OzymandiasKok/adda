import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const bodyText = await req.text()
  const data = JSON.parse(bodyText)

  if (!data) {
    return NextResponse.json({ error: 'Dados não fornecidos' }, { status: 400 })
  }

  const { name, email, telefone, empresa, password } = data
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const userData = { name, email, telefone, empresa, password: hashedPassword }

  console.log(userData)

  const response = await fetch('https://palpiteiro.pro/save_user_data/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

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
