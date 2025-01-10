import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('@adda-partners:token')
  const { searchParams, pathname } = new URL(request.url)

  // Redireciona para '/' se já existir um token e o usuário tentar acessar /login ou /registrar
  if (token && (pathname === '/login' || pathname === '/registrar')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Se não houver token, redireciona apenas para /login nas páginas /quadros e /usuario
  if (
    !token &&
    (pathname.startsWith('/quadros') || pathname.startsWith('/usuario'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === '/quadros') {
    const empresa = searchParams.get('empresa')
    const userId = searchParams.get('userId')
    const empresaId = searchParams.get('empresaId')

    if (!empresa || !userId || !empresaId) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/usuario/:path*', '/quadros/', '/login', '/registrar'],
}
