'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { z } from 'zod'
import { jwtDecode } from 'jwt-decode'
import { JwtPayload } from 'jsonwebtoken'
import Cookies from 'js-cookie'

import type { formRegisterSchema } from '../(home)/(auth)/registrar/components/form-register'

type UserProps = z.infer<typeof formRegisterSchema>

interface CustomJwtPayload extends JwtPayload {
  id: number
  name: string
  email: string
  telefone: string
  empresa: string
  user_id: number
}

interface AuthContextType {
  login: boolean
  user: UserProps | null
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState<UserProps | null>(null)

  // console.log('aq', user)

  // quando rolar refresh da pagina,
  // verifica se ja tem dados do user no localStorage
  useEffect(() => {
    const token = Cookies.get('@adda-partners:token')

    if (token) {
      try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token)
        setLogin(true)

        const user = {
          id: decodedToken.user_id,
          name: decodedToken.name,
          email: decodedToken.email,
          telefone: decodedToken.telefone,
          empresa: decodedToken.empresa,
          password: decodedToken.password,
        }

        setUser(user)
      } catch (err) {
        console.error('Erro ao decodificar o token:', err)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acessar o contexto
export const useAuthContext = () => useContext(AuthContext)
