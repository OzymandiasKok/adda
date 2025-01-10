'use sever'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tittle } from '@/components/tittle'
import { NovaOperacao } from './components/nova-operacao'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'

export interface OperacaoProps {
  id: string
  operacao: string
  empresa?: string
  segmento?: string
  volumeOperacao: number
  statusDocumentacao?: number
  ultimaAtualizacao?: string
}

const headers = [
  { content: 'Operações', colSpan: 1 },
  { content: 'Empresa', colSpan: 1 },
  { content: 'Segmento', colSpan: 1 },
  { content: 'Volume da Operação', colSpan: 1 },
  // { content: 'Última atualização', colSpan: 1 },
  // { content: 'Ações', colSpan: 2 },
]

const fetchOperacoesData = async (idEmpresa: number) => {
  try {
    const response = await axios.get(
      'https://palpiteiro.pro/operacoes2/listar/',
      {
        params: { idEmpresa },
      },
    )
    return response.data
  } catch (error) {
    console.error('Erro ao buscar operações:', error)
    return []
  }
}

export default async function Operacoes({
  searchParams,
}: {
  searchParams: {
    empresa: string
    idEmpresa: number
    userId: number
    cnpj: string
  }
}) {
  const userId = Number(searchParams.userId)
  const nomeEmpresa = searchParams.empresa
  const idEmpresa = Number(searchParams.idEmpresa)
  const cnpj = Number(searchParams.cnpj)

  const operacoesData: OperacaoProps[] = await fetchOperacoesData(idEmpresa)

  return (
    <div className="container mx-auto my-14 flex flex-col gap-14 px-10">
      <div className="flex flex-col items-center gap-3">
        <Tittle>Status das Operações</Tittle>
        <h2 className="text-xl font-semibold text-themeColor">{nomeEmpresa}</h2>
      </div>

      <div className="flex justify-end">
        <NovaOperacao userId={userId} idEmpresa={idEmpresa} />
      </div>

      <Table className="border border-themeColor bg-[#BDC4C8]">
        <TableHeader>
          <TableRow className="border border-black bg-[#607079]">
            {headers.map((header) => (
              <TableHead
                key={header.content}
                colSpan={header.colSpan}
                className="border border-black px-4 py-2 text-center text-white"
              >
                {header.content}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {operacoesData.map((operacao) => (
            <TableRow
              key={operacao.id}
              className="border border-themeColor text-center"
            >
              <TableCell className="border-x border-themeColor">
                {operacao.operacao}
              </TableCell>
              <TableCell className="border-x border-themeColor">
                {nomeEmpresa}
              </TableCell>
              <TableCell className="border-x border-themeColor">
                {operacao.segmento}
              </TableCell>
              <TableCell className="border-x border-themeColor text-center">
                R${' '}
                {operacao.volumeOperacao.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        href={`/quadros?empresa=${nomeEmpresa}&userId=${userId}&empresaId=${idEmpresa}&cnpj=${cnpj}`}
        className="mx-auto rounded-md border-themeColor bg-themeColor p-2 px-6 text-sm font-medium text-white hover:bg-black/80"
      >
        Cadastrar Informações
      </Link>
    </div>
  )
}
