/* eslint-disable */

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import dynamic from 'next/dynamic'
import TablePecuaria from './pecuaria/table-pecuaria'
import { TableEstruturaFisicaPatrimonio } from './estrutura-fisica-patrimonio/table-estrutura-fisica-e-patrimonio'
import { TableFazendas } from './fazendas/table-fazendas'
import { TableVendas } from './vendas/table-vendas'
import { TableFornecedores } from './fornecedores/table-fornecedores'
import { TableDividas } from './dividas/table-dividas'
import { TablesProvider } from '@/app/contexts/tables-context'
import { Button } from '@/components/ui/button'
import { SaveData } from './components/save-data'

const TableAgricultura = dynamic<React.ComponentType<any>>(
  () => import('./agricultura/table-agricultura'),
  { ssr: false, loading: () => <p>Carregando...</p> },
)

const tabs = [
  {
    label: 'Agricultura',
    value: 'agricultura',
    table: TableAgricultura as React.ComponentType<any>,
  },
  {
    label: 'Pecuária',
    value: 'Pecuaria',
    table: TablePecuaria as React.ComponentType<any>,
  },
  {
    label: 'Estrutura Física e Patrimônio',
    value: 'estrutura-fisica-patrimonio',
    table: TableEstruturaFisicaPatrimonio as React.ComponentType<any>,
  },
  { label: 'Fazendas', value: 'fazendas',
    table: TableFazendas as React.ComponentType<any>,
   },
  { label: 'Vendas', value: 'vendas',     
    table: TableVendas as React.ComponentType<any>,
  },
  { label: 'Fornecedores', value: 'fornecedores',
    table: TableFornecedores as React.ComponentType<any>,
   },
  { label: 'Dívidas', value: 'dívidas',
    table: TableDividas as React.ComponentType<any>,
   },
]

export default async function Quadros({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  const params = await searchParams
  const nomeEmpresa = params.empresa
  const idEmpresa = params.id as string
  const cnpj = params.cnpj as string
  
  return (
    <TablesProvider>
    <div className='my-14  min-h-screen w-full px-10 '>
      <div className="relative flex w-full  mb-10 items-center justify-center">
        <h2 className="text-xl font-semibold text-themeColor">{nomeEmpresa}</h2>
        <SaveData />
      </div>

    <div className="flex flex-col gap-14 ">
      <Tabs
        defaultValue="agricultura"
        className="flex w-full flex-col items-center"
      >
        <TabsList className="relative w-full justify-center gap-5 overflow-hidden rounded-xl bg-transparent text-white">
          {tabs.map((tab) => (
            <>
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="z-50 rounded-full border bg-zinc-300 p-4 text-lg text-black data-[state=active]:bg-themeColor data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            </>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent
            className="mt-14 w-full"
            key={tab.value}
            value={tab.value}
          >
            {tab.table && <tab.table />}
          </TabsContent>
        ))}
      </Tabs>
    </div>
    </div>
    </TablesProvider>
  )
}
