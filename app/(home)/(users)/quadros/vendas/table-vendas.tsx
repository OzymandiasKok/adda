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

const headerClientes = [
  { content: 'Nome do Comprador:' },
  { content: 'Produto' },
  { content: 'Relevância (%)' },
  { content: 'Mês de Recebimento' },
]

const rowsClientes = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o nome',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o produto' },
      { value: '', inputType: 'text', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
    ],
  },
]

const headerContratoVendas = [
  { content: 'Nome do Comprador:' },
  { content: 'Produto' },
  { content: 'Unidade' },
  { content: 'Preço' },
  { content: 'Volume' },
  { content: 'Data de Recebimento' },
]

const rowsContratoVendas = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o nome',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o produto' },
      { value: '', inputType: 'text', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
    ],
  },
]

export function TableVendas() {
  const { tableGroup, idEmpresaParam, handleTableGroupChange } =
    useTablesContext()

  const [tableClientes, setTableClientes] = useState<TableProps>({
    id: uuidv4(),
    headers: headerClientes,
    rows: rowsClientes,
  })

  const [tableContratoVendas, setTableContratoVendas] = useState<TableProps>({
    id: uuidv4(),
    headers: headerContratoVendas,
    rows: rowsContratoVendas,
  })

  console.log(tableGroup)

  useEffect(() => {
    Object.values(tableGroup).forEach((tableGroupItem) => {
      if (
        String(tableGroupItem.empresaID) === idEmpresaParam &&
        tableGroupItem.vendas.tables.length > 0
      ) {
        const tableClientes = tableGroupItem.vendas.tables[0]
        setTableClientes(tableClientes)

        const tableContratoVendas = tableGroupItem.vendas.tables[1]
        setTableContratoVendas(tableContratoVendas)
      }
    })
  }, [idEmpresaParam])

  useEffect(() => {
    const allTables = [tableClientes, tableContratoVendas]

    if (allTables) {
      const tables = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables,
      }

      handleTableGroupChange(updatedTableGroupData, 'vendas')
    }
  }, [tableClientes, tableContratoVendas])

  const handleTableClientesChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tableClientes,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTableClientes(updatedTable)
  }

  const handleTableContratoVendasChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tableContratoVendas,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTableContratoVendas(updatedTable)
  }

  const handleAddNewField = (tableId: string) => {
    if (tableId === tableClientes.id) {
      const newRow = { inputs: [...rowsClientes[0].inputs] }
      setTableClientes((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    } else if (tableId === tableContratoVendas.id) {
      const newRow = { inputs: [...rowsContratoVendas[0].inputs] }
      setTableContratoVendas((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Vendas</Tittle>

      {/* Principais Clientes */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Principais Clientes
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableClientes.id}
            headers={tableClientes.headers}
            rows={tableClientes.rows}
            onInputChange={(updatedData) =>
              handleTableClientesChange(updatedData)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableClientes.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Cliente
          </Button>
        </div>
      </div>

      {/* Contrato de Vendas */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Contrato de Vendas
        </div>
        <div className="flex flex-col gap-5">
          <div className="">
            <TableContainer
              tableId={tableContratoVendas.id}
              headers={tableContratoVendas.headers}
              rows={tableContratoVendas.rows}
              onInputChange={(updatedData) =>
                handleTableContratoVendasChange(updatedData)
              }
            />
            <span className="text-sm font-semibold">
              Informar todos os contratos de venda celebrados na safra atual,
              indicando o volume e o preço fixado para recebimento.
            </span>
          </div>
          <Button
            onClick={() => handleAddNewField(tableContratoVendas.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Contrato
          </Button>
        </div>
      </div>
    </div>
  )
}
