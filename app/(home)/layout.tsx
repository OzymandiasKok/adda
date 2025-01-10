import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ReactNode } from 'react'
import { AuthProvider } from '../contexts/auth-context'
import { Toaster } from '@/components/ui/sonner'
import { ReactQueryProvider } from '../contexts/react-query-provider'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <AuthProvider>
        <div className="flex min-h-screen flex-col antialiased">
          <Header />
          <div className=""> {children} </div>
          <Footer />
        </div>
        <Toaster richColors />
      </AuthProvider>
    </ReactQueryProvider>
  )
}
