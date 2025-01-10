'use client'

import { useTablesContext } from '@/app/contexts/tables-context'
import {
  TableContainer,
  type RowProps,
  type TableProps,
} from '@/components/table'
import { Tittle } from '@/components/tittle'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const currentYear = new Date().getFullYear()

const years = [
  `${currentYear - 1}/${currentYear}`,
  `${currentYear}/${currentYear + 1}`,
  `Projeção ${currentYear + 1}/${currentYear + 2}`,
]

const headerEstruturaFisica = [
  [
    { content: 'Ativo' },
    { content: 'Quantidade de Silos (Un)' },
    { content: 'Capacidade (Ton)' },
    { content: 'Valor total da Frota (R$)' },
  ],
  [
    { content: 'Ativo' },
    { content: 'Quantidade de Veículos (Un)' },
    { content: 'ID Média da Frota (Un)' },
    { content: 'Valor total da Frota (R$)' },
  ],
  [
    { content: 'Ativo' },
    { content: 'Quantidade de Máquinas (Un)' },
    { content: 'Quantidade de Implementos (Un)' },
    { content: 'Valor Máquinas e Implementos' },
  ],
  [
    { content: 'Ativo' },
    { content: 'Quantidade de Outros (Un)' },
    { content: 'Quantidade de Outros (Un)' },
    { content: 'Valor de Outros (R$)' },
  ],
]

const rowsEstruturaFisica = [
  {
    label: 'Armazenagem',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Frota de Veículos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Máquinas e Implementos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Outros',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
]

const headerInvestimentos = [
  {
    content: 'Investimentos:',
  },
  ...years.map((year) => ({
    content: year,
  })),
]

const rowsInvestimentos = [
  {
    label: 'Máquina e Implementos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Abertura / Conversão de Áreas',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Correção de Solo',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Silos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Outros',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
]

const headerPatrimonio = [
  {
    content: 'Bens:',
  },
  {
    content: 'Quantidade (Un)',
  },
  {
    content: 'Área (m2 e ha)',
  },
  {
    content: 'Valor de Mercado',
  },
]

const rowsPatrimonio = [
  {
    label: 'Máquina e Implementos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Abertura / Conversão de Áreas',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Correção de Solo',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Silos',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
  {
    label: 'Outros',
    inputs: [
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
      { value: '', inputType: 'number' },
    ],
  },
]

export function TableEstruturaFisicaPatrimonio() {
  const {
    tableGroup,
    isTableGroupLoading,
    idEmpresaParam,
    handleTableGroupChange,
  } = useTablesContext()

  const [tablesEstruturaFisica, setTablesEstruturaFisica] = useState<
    TableProps[]
  >(
    headerEstruturaFisica.map((header, i) => ({
      id: uuidv4(),
      headers: header,
      rows: [rowsEstruturaFisica[i]],
    })),
  )

  const [tableInvestimentos, setTableInvestimentos] = useState<TableProps>({
    id: uuidv4(),
    headers: headerInvestimentos,
    rows: rowsInvestimentos,
  })

  const [tablePatrimonio, setTablePatrimonio] = useState<TableProps>({
    id: uuidv4(),
    headers: headerPatrimonio,
    rows: rowsPatrimonio,
  })

  console.log(tablesEstruturaFisica[0].rows[0].inputs[0])

  useEffect(() => {
    if (isTableGroupLoading) {
      Object.values(tableGroup).forEach((tableGroupItem) => {
        if (
          String(tableGroupItem.empresaID) === idEmpresaParam &&
          tableGroupItem.estruturaFisicaPatrimonio.tables.length > 0
        ) {
          const estruturaFisicaTables =
            tableGroupItem.estruturaFisicaPatrimonio.tables.slice(0, 4)
          setTablesEstruturaFisica(estruturaFisicaTables)

          const tableInvestimentos =
            tableGroupItem.estruturaFisicaPatrimonio.tables[4]
          setTableInvestimentos(tableInvestimentos)

          const tablePatrimonio =
            tableGroupItem.estruturaFisicaPatrimonio.tables[5]
          setTablePatrimonio(tablePatrimonio)
        }
      })
    }
  }, [isTableGroupLoading])

  useEffect(() => {
    const allTables = [
      ...tablesEstruturaFisica,
      tableInvestimentos,
      tablePatrimonio,
    ]

    if (allTables) {
      const tables = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables,
      }

      handleTableGroupChange(updatedTableGroupData, 'estruturaFisicaPatrimonio')
    }
  }, [tablesEstruturaFisica, tableInvestimentos, tablePatrimonio])

  const handleTableEstruturaChange = (
    updatedData: RowProps[],
    tableId: string,
  ) => {
    const updatedTables = tablesEstruturaFisica.map((table) =>
      table.id === tableId
        ? {
            ...table,
            rows: updatedData.map((row) => ({ ...row })),
          }
        : table,
    )
    setTablesEstruturaFisica(updatedTables)
  }

  const handleTableInvestimentosChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tableInvestimentos,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTableInvestimentos(updatedTable)
  }

  const handleTablePatrimonioChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tablePatrimonio,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTablePatrimonio(updatedTable)
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Estrutura Física e Patrimônio</Tittle>

      {/* Estrutura Física */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Estrutura física
        </div>
        <div className="flex flex-col gap-5 border">
          {tablesEstruturaFisica.map((table) => (
            <TableContainer
              key={table.id}
              tableId={table.id}
              headers={table.headers}
              rows={table.rows}
              onInputChange={(updatedData) =>
                handleTableEstruturaChange(updatedData, table.id)
              }
            />
          ))}
        </div>
      </div>

      {/* Investimentos Realizados/Planejados */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Investimentos Realizados/Planejados
        </div>

        <TableContainer
          tableId={tableInvestimentos.id}
          headers={tableInvestimentos.headers}
          rows={tableInvestimentos.rows}
          onInputChange={(updatedData) =>
            handleTableInvestimentosChange(updatedData)
          }
        />
      </div>

      {/* Patrimônio */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Patrimônio
        </div>

        <TableContainer
          tableId={tablePatrimonio.id}
          headers={tablePatrimonio.headers}
          rows={tablePatrimonio.rows}
          onInputChange={(updatedData) =>
            handleTablePatrimonioChange(updatedData)
          }
        />
      </div>
    </div>
  )
}
