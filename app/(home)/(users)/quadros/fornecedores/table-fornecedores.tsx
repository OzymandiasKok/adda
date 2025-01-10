'use client'

import { useTablesContext } from '@/app/contexts/tables-context'
import {
  TableContainer,
  type RowProps,
  type TableProps,
} from '@/components/table'
import { Tittle } from '@/components/tittle'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const headerFornecedores = [
  { content: 'Nome do Fornecedor:' },
  { content: 'Relevância (%)' },
  { content: 'Mês de Pagamento' },
  { content: 'Limite de Financiamento' },
]

const rowsFornecedores = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o nome',
      },
      { value: '', inputType: 'text', placeholder: '-' },
      { value: '', inputType: 'text', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
    ],
  },
]

const createTable = (headers: { content?: string }[], rows: RowProps[]) => ({
  id: uuidv4(),
  headers,
  rows: JSON.parse(JSON.stringify(rows)),
})

export function TableFornecedores() {
  const { tableGroup, idEmpresaParam, handleTableGroupChange } =
    useTablesContext()

  const [tableFertilizante, setTableFertilizante] = useState<TableProps>(
    createTable(headerFornecedores, rowsFornecedores),
  )
  const [tableDefensivos, setTableDefensivos] = useState<TableProps>(
    createTable(headerFornecedores, rowsFornecedores),
  )
  const [tableSementes, setTableSementes] = useState<TableProps>(
    createTable(headerFornecedores, rowsFornecedores),
  )

  useEffect(() => {
    Object.values(tableGroup).forEach((tableGroupItem) => {
      if (
        String(tableGroupItem.empresaID) === idEmpresaParam &&
        tableGroupItem.fornecedores.tables.length > 0
      ) {
        const tableFertilizante = tableGroupItem.fornecedores.tables[0]
        setTableFertilizante(tableFertilizante)

        const tableDefensivos = tableGroupItem.fornecedores.tables[1]
        setTableDefensivos(tableDefensivos)

        const tableSementes = tableGroupItem.fornecedores.tables[2]
        setTableSementes(tableSementes)
      }
    })
  }, [idEmpresaParam])

  useEffect(() => {
    const allTables = [tableFertilizante, tableDefensivos, tableSementes]

    if (allTables) {
      const tables = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables,
      }

      handleTableGroupChange(updatedTableGroupData, 'fornecedores')
    }
  }, [tableFertilizante, tableDefensivos, tableSementes])

  const handleTableChange = (updatedData: RowProps[], tableId: string) => {
    if (tableId === tableFertilizante.id) {
      setTableFertilizante((prevState) => ({
        ...prevState,
        rows: updatedData.map((row) => ({ ...row })),
      }))
    } else if (tableId === tableDefensivos.id) {
      setTableDefensivos((prevState) => ({
        ...prevState,
        rows: updatedData.map((row) => ({ ...row })),
      }))
    } else if (tableId === tableSementes.id) {
      setTableSementes((prevState) => ({
        ...prevState,
        rows: updatedData.map((row) => ({ ...row })),
      }))
    }
  }

  const handleAddNewField = (tableId: string) => {
    const tables = [
      {
        id: tableFertilizante.id,
        setState: setTableFertilizante,
        rows: tableFertilizante.rows,
      },
      {
        id: tableDefensivos.id,
        setState: setTableDefensivos,
        rows: tableDefensivos.rows,
      },
      {
        id: tableSementes.id,
        setState: setTableSementes,
        rows: tableSementes.rows,
      },
    ]

    const table = tables.find((t) => t.id === tableId)

    if (table) {
      const newRow = { inputs: [...rowsFornecedores[0].inputs] }
      table.setState((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Fornecedores</Tittle>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Principais Fornecedores Fertilizantev
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableFertilizante.id}
            headers={tableFertilizante.headers}
            rows={tableFertilizante.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableFertilizante.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableFertilizante.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Principais Fornecedores Defensivos
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableDefensivos.id}
            headers={tableDefensivos.headers}
            rows={tableDefensivos.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableDefensivos.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableDefensivos.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Principais Fornecedores Sementes
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableSementes.id}
            headers={tableSementes.headers}
            rows={tableSementes.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableSementes.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableSementes.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>
    </div>
  )
}
