'use sever'
import { Tittle } from '@/components/tittle'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { NovaEmpresa } from './components/nova-empresa'
import Link from 'next/link'
import axios from 'axios'

export interface EmpresaProps {
  userId: string
  idEmpresa: string
  razaoSocial: string
  cnpj: string
  email: string
  tel: string
  // status?: string | undefined
}

const headers = [
  { content: 'Razão Social', colSpan: 1 },
  { content: 'CNPJ', colSpan: 1 },
  { content: 'E-mail', colSpan: 1 },
  { content: 'Telefone', colSpan: 1 },
  { content: 'Status da documentação', colSpan: 1 },
  { content: 'Ações', colSpan: 2 },
]

const fetchEmpresasData = async (userId: string) => {
  console.log('userId', userId)
  try {
    const response = await axios.get(
      'https://palpiteiro.pro/operacoes/listar',
      {
        params: { userId },
      },
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar empresas:', error)
    return []
  }
}

export default async function Empresas({
  searchParams,
}: {
  searchParams: { userId: string }
}) {
  const userId = searchParams.userId

  const empresasData = await fetchEmpresasData(userId)

  return (
    <div className="container mx-auto my-14 flex flex-col gap-14 px-10">
      <Tittle>Empresas Cadastradas</Tittle>

      <div className="flex justify-end">
        {/* <div className="flex items-center gap-3">
          <Label htmlFor="buscar">Pesquisar por empresa:</Label>
          <Input
            id="buscar"
            className="w-60 border-themeColor/80"
            placeholder=""
          />
        </div> */}

        <NovaEmpresa />
      </div>

      {/* tabela */}
      <Table className="border border-themeColor bg-[#BDC4C8]">
        <TableHeader>
          <TableRow className="border border-black bg-[#607079]">
            {headers.map((header) => (
              <TableHead
                key={header.content}
                colSpan={header.colSpan}
                className="border border-black px-4 py-2 text-white"
              >
                {header.content}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {empresasData.map((empresa: EmpresaProps) => (
            <TableRow key={empresa.userId} className="border border-themeColor">
              <TableCell className="border-x border-themeColor">
                {empresa.razaoSocial}
              </TableCell>
              <TableCell className="border-x border-themeColor">
                {empresa.cnpj}
              </TableCell>
              <TableCell className="border-x border-themeColor">
                {empresa.email}
              </TableCell>
              <TableCell className="w-40 border-x border-themeColor">
                {empresa.tel}
              </TableCell>
              <TableCell className="w-8 border-x border-themeColor text-center">
                0%
              </TableCell>
              <TableCell className="border-x border-themeColor text-center">
                <Link
                  href={`/usuario/operacoes?empresa=${empresa.razaoSocial}&idEmpresa=${empresa.idEmpresa}&userId=${empresa.userId}&cnpj=${empresa.cnpj}`}

                  className="rounded-md border border-themeColor p-1 px-2 font-semibold text-themeColor hover:bg-themeColor hover:text-white"
                >
                  Continuar
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
