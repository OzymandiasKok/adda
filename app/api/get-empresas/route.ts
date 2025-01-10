import { NextResponse, NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('user_id')

  if (!userId) {
    return NextResponse.json(
      { error: 'user_id é obrigatório' },
      { status: 400 },
    )
  }

  try {
    // Fazendo a requisição com o user_id na URL
    const response = await fetch(
      `https://palpiteiro.pro/operacoes/listar/?user_id=${userId}`,
    )

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Erro ao buscar dados da API externa' },
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
