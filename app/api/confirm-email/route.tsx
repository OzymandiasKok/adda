// /app/api/confirm-email/route.ts
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.json(
      { error: 'Token é obrigatório' },
      { status: 400 },
    )
  }

  try {
    // Fazendo a requisição ao backend com o token
    const response = await fetch(
      `https://palpiteiro.pro/email/confirm-email/${token}/`
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao confirmar o e-mail' },
        { status: response.status },
      )
    }

    // Consome o corpo da resposta uma única vez
    const data = await response.json()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro no servidor' }, { status: 500 })
  }
}
