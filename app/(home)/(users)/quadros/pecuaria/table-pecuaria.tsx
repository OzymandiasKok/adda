'use client'

import { Input } from '@/components/ui/input'
import {
  TableContainer,
  type HeaderSuperiorProps,
  type RowProps,
  type TableProps,
} from '@/components/table'
// import { TablePecuariaTotal } from '.table/-pecuaria-total'
import { Tittle } from '@/components/tittle'
import { v4 as uuidv4 } from 'uuid'
import { useEffect, useState } from 'react'
import { useTablesContext } from '@/app/contexts/tables-context'

const currentYear = new Date().getFullYear()

const years = [
  currentYear - 3,
  currentYear - 2,
  currentYear - 1,
  currentYear,
  currentYear + 1,
  currentYear + 2,
  currentYear + 3,
]

const headerTabelaSuperior = [
  {
    content: 'Plantel',
  },
  {
    content: 'Macho',
  },
  {
    content: 'Fêmea',
  },
  {
    content: 'Total',
  },
]

const rowsTabelaSuperior: RowProps[] = [
  'Animais de 0 a 6 meses',
  'Animais de 6 a 12 meses',
  'Animais de 12 a 18 meses',
  'Animais de 18 a 24 meses',
  'Animais de 24 a 30 meses',
  'Animais de 30 a 36 meses',
  'Animais de mais de 36 meses',
  'Total',
].map((label) => ({
  label,
  inputs: Array(3).fill({ value: '', inputType: 'number' }),
}))

const tableCicloArray = [
  {
    header: [
      { content: 'Bovinos' },
      ...years.map((year) => ({
        content: `${year}/${year + 1}`,
      })),
    ],
    rows: [
      { label: 'Área Destinada à Pecuária (ha)' },
      { label: 'Quantidade de Vacas Matrizes (Cabeças)' },
      { label: 'Taxa de Descarte Anual de Vacas Matrizes (%)' },
      { label: 'Taxa de Lotação (UA/ha)' },
      { label: 'Taxa de Natalidade (%)' },
      { label: 'Taxa de Mortalidade de Bezerros (%)' },
      { label: 'Quantidade de Bezerros Vendidos (Cabeças)' },
      { label: 'Quantidade de Bezerras Vendidas (Cabeças)' },
      { label: 'Custo de Produção do Ciclo (R$/cab)' },
      { label: 'Duração do Ciclo (Meses)' },
      { label: 'Peso de Saída (Kg)' },
      { label: 'Preço de Venda de Bezerros (R$/cab)' },
      { label: 'Preço de Venda de Bezerras (R$/cab)' },
      { label: 'Quantidade de Bezerros Descartados (%)' },
      { label: 'Preço de Descarte de Bezerros (%)' },
    ].map((row) => ({
      ...row,
      inputs: Array(7).fill({ value: '', inputType: 'number' }),
    })),
  },
  {
    header: [
      { content: 'Bovinos' },
      ...years.map((year) => ({
        content: `${year}/${year + 1}`,
      })),
    ],
    rows: [
      { label: 'Área Destinada à Pecuária (ha)' },
      { label: 'Taxa de Lotação (UA/ha)' },
      { label: 'Taxa de Mortalidade (%)' },
      { label: 'Quantidade de Animais em Recria por Ano (Cabeças)' },
      { label: 'Preço de Compra do Animal para Recria (R$/cab)' },
      { label: 'Peso de Entrada do Animal na Recria (Kg)' },
      { label: 'Ganho Médio Diário de Peso (Kg/dia)' },
      { label: 'Custo da @ Engordada no Animal Vivo (@)' },
      { label: 'Peso de Saída do Animal Recriado (Kg)' },
      { label: 'Preço de Venda do Animal Recriado (R$/cab)' },
    ].map((row) => ({
      ...row,
      inputs: Array(7).fill({ value: '', inputType: 'number' }),
    })),
  },
  {
    header: [
      { content: 'Bovinos' },
      ...years.map((year) => ({
        content: `${year}/${year + 1}`,
      })),
    ],
    rows: [
      { label: 'Área Destinada à Pecuária (ha)' },
      { label: 'Taxa de Lotação (UA/ha)' },
      { label: 'Taxa de Mortalidade (%)' },
      { label: 'Animais que Entram na Terminação por Ano (Cabeças)' },
      { label: 'Preço de Compra do Animal para Engorda (R$/cab)' },
      { label: 'Peso de Entrada do Animal na Terminação (Kg)' },
      { label: 'Ganho Médio Diário de Peso (Kg/dia)' },
      { label: 'Custo do @ Engordado no Animal Vivo (@)' },
      { label: 'Peso de Saída do Boi Gordo (Kg)' },
      { label: 'Preço de Venda do Boi Gordo (R$/@)' },
      { label: 'Rendimento de Carcaça do Boi Gordo (%)' },
    ].map((row) => ({
      ...row,
      inputs: Array(7).fill({ value: '', inputType: 'number' }),
    })),
  },
]

const headerSuperior = [
  [
    {
      label: 'Sistema',
      content: ['Pastagem', 'Semi Confinamento', 'Confinamento', 'Boitel'],
    },
  ],
  [
    {
      label: 'Sistema',
      content: ['Pastagem', 'Semi Confinamento', 'Confinamento', 'Boitel'],
    },
  ],
  [
    {
      label: 'Sistema',
      content: ['Pastagem', 'Semi Confinamento', 'Confinamento', 'Boitel'],
    },
  ],
]

const createTable = (headers: { content?: string }[], rows: RowProps[]) => ({
  id: uuidv4(),
  headers,
  rows: JSON.parse(JSON.stringify(rows)),
})

export default function TablePecuaria() {
  const {
    tableGroup,
    isTableGroupLoading,
    idEmpresaParam,
    handleTableGroupChange,
  } = useTablesContext()
  const [tables, setTables] = useState<TableProps[]>(
    tableCicloArray.map((table) => createTable(table.header, table.rows)),
  )
  const [tablePlantel, setTablePlantel] = useState<TableProps>(
    createTable(headerTabelaSuperior, rowsTabelaSuperior),
  )

  const [headerSuperiorValues, setHeaderSuperiorValues] = useState<
    HeaderSuperiorProps[][]
  >(
    headerSuperior.map((subArray) =>
      subArray.map((item) => ({
        label: item.label,
        content: '',
      })),
    ),
  )

  console.log(tableGroup)

  useEffect(() => {
    if (isTableGroupLoading) {
      Object.values(tableGroup).forEach((tableGroupItem) => {
        if (
          String(tableGroupItem.empresaID) === idEmpresaParam &&
          tableGroupItem.pecuaria.tables.length > 0
        ) {
          const [tablePlantel, ...otherTables] = tableGroupItem.pecuaria.tables
          setTablePlantel(tablePlantel)
          setTables(otherTables)
        }
      })
    }
  }, [isTableGroupLoading])

  useEffect(() => {
    const allTables = [tablePlantel, ...tables]

    if (allTables) {
      const tablesMapped = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables: tablesMapped,
      }

      handleTableGroupChange(updatedTableGroupData, 'pecuaria')
    }
  }, [tables, tablePlantel])

  useEffect(() => {
    if (tables && headerSuperiorValues) {
      const combinedTables = tables.map((table, index) => ({
        ...table,
        headerSuperior: headerSuperiorValues[index] || {},
      }))

      const updatedTableGroupData = {
        tables: combinedTables,
      }
      handleTableGroupChange(updatedTableGroupData, 'pecuaria')
    }
  }, [tables, headerSuperiorValues])

  const handleTableChange = (updatedData: RowProps[], tableId: string) => {
    const updatedTables = tables.map((table) =>
      table.id === tableId
        ? {
            ...table,
            rows: updatedData.map((row) => ({ ...row })),
          }
        : table,
    )

    setTables(updatedTables)
  }

  const handleTablePlantelChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tablePlantel,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTablePlantel(updatedTable)
  }

  const handleUpdateHeaderSuperior = (
    headerIndex: number,
    index: number,
    value: string,
  ) => {
    console.log(headerIndex, index, value)
    setHeaderSuperiorValues((prevValues) => {
      const updatedValues = prevValues.map((item, idx) => {
        if (idx === headerIndex) {
          return item.map((header, headerIdx) => {
            if (headerIdx === index) {
              return {
                ...header,
                content: value,
              }
            }
            return header
          })
        }
        return item
      })

      return updatedValues
    })
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Pecuária</Tittle>

      <div className="flex flex-col gap-10">
        <TableContainer
          tableId={tablePlantel.id}
          headers={tablePlantel.headers}
          rows={tablePlantel.rows}
          onInputChange={(updatedData) => handleTablePlantelChange(updatedData)}
        />

        <div className="flex flex-col gap-10">
          {tables.map((table, i) => (
            <TableContainer
              key={table.id}
              tableId={table.id}
              headers={table.headers}
              rows={table.rows}
              headerSuperior={headerSuperior[i]}
              headerSuperiorIndex={i}
              onInputChange={(updatedData) =>
                handleTableChange(updatedData, table.id)
              }
              onHeaderChange={handleUpdateHeaderSuperior}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
