'use client'

import { useTablesContext } from '@/app/contexts/tables-context'
import { TableContainer, type RowProps } from '@/components/table'
import { Tittle } from '@/components/tittle'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const headerDividas = [
  { content: 'Nome da instituição:' },
  { content: 'Nome do Devedor' },
  { content: 'Modalidade' },
  { content: 'Moeda' },
  { content: 'Taxa % (a.a)' },
  { content: 'Vencimento' },
  { content: 'Amortização' },
  { content: 'Valor total (R$)' },
  { content: 'Garantias' },
  { content: 'Anexar contrato' },
]

const rowsDividas = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira a instituição',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o devedor' },
      { value: '', inputType: 'text', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

const headerDividasTerra = [
  { content: 'Nome do vendedor:' },
  { content: 'Nome do comprador:' },
  { content: 'Matrícula do imóvel' },
  { content: 'Data de Compra' },
  { content: 'Mês de pagamento' },
  { content: 'Valor da parcela' },
  { content: 'Saldo a pagar' },
  { content: 'Anexar contrato' },
]

const rowsDividasTerra = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o vendedor',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o comprador' },
      { value: '', inputType: 'text', placeholder: 'Insira o imóvel' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

const headerPagarFornecedores = [
  { content: 'Nome do Fornecedor:' },
  { content: 'Valor (R$)' },
  { content: 'Data do Vencimento' },
  { content: 'Anexar contrato' },
]

const rowsPagarFornecedores = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o fornecedor',
      },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

const headerFinanciamentoInsumos = [
  { content: 'Formas de financiamento:' },
  { content: 'Relevância (%)' },
  { content: 'Prazo do Financiamento' },
  { content: 'Anexar contrato' },
]

const rowsFinanciamentoInsumos = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira a forma de financiamento',
      },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

const createTable = (headers: { content?: string }[], rows: RowProps[]) => ({
  id: uuidv4(),
  headers,
  rows: JSON.parse(JSON.stringify(rows)),
})

export function TableDividas() {
  const { tableGroup, idEmpresaParam, handleTableGroupChange } =
    useTablesContext()
  const [tableDividas, setTableDividas] = useState(
    createTable(headerDividas, rowsDividas),
  )
  const [tableDividasTerra, setTableDividasTerra] = useState(
    createTable(headerDividasTerra, rowsDividasTerra),
  )
  const [tablePagarFornecedores, setTablePagarFornecedores] = useState(
    createTable(headerPagarFornecedores, rowsPagarFornecedores),
  )
  const [tableFinanciamentoInsumos, setTableFinanciamentoInsumos] = useState(
    createTable(headerFinanciamentoInsumos, rowsFinanciamentoInsumos),
  )

  useEffect(() => {
    Object.values(tableGroup).forEach((tableGroupItem) => {
      if (
        String(tableGroupItem.empresaID) === idEmpresaParam &&
        tableGroupItem.dividas.tables.length > 0
      ) {
        const tableDividas = tableGroupItem.dividas.tables[0]
        setTableDividas(tableDividas)

        const tableDividasTerra = tableGroupItem.dividas.tables[1]
        setTableDividasTerra(tableDividasTerra)

        const tablePagarFornecedores = tableGroupItem.dividas.tables[2]
        setTablePagarFornecedores(tablePagarFornecedores)

        const tableFinanciamentoInsumos = tableGroupItem.dividas.tables[3]
        setTableFinanciamentoInsumos(tableFinanciamentoInsumos)
      }
    })
  }, [idEmpresaParam])

  useEffect(() => {
    const allTables = [
      tableDividas,
      tableDividasTerra,
      tablePagarFornecedores,
      tableFinanciamentoInsumos,
    ]

    if (allTables) {
      const tables = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables,
      }

      handleTableGroupChange(updatedTableGroupData, 'dividas')
    }
  }, [
    tableDividas,
    tableDividasTerra,
    tablePagarFornecedores,
    tableFinanciamentoInsumos,
  ])

  console.log(tableGroup)

  const handleTableChange = (updatedData: RowProps[], tableId: string) => {
    const tables = [
      {
        id: tableDividas.id,
        setState: setTableDividas,
        rows: tableDividas.rows,
      },
      {
        id: tableDividasTerra.id,
        setState: setTableDividasTerra,
        rows: tableDividasTerra.rows,
      },
      {
        id: tablePagarFornecedores.id,
        setState: setTablePagarFornecedores,
        rows: tablePagarFornecedores.rows,
      },
      {
        id: tableFinanciamentoInsumos.id,
        setState: setTableFinanciamentoInsumos,
        rows: tableFinanciamentoInsumos.rows,
      },
    ]

    const table = tables.find((t) => t.id === tableId)

    if (table) {
      table.setState((prevState) => ({
        ...prevState,
        rows: updatedData.map((row) => ({ ...row })),
      }))
    }
  }

  const handleAddNewField = (tableId: string) => {
    const tableMap = {
      [tableDividas.id]: rowsDividas,
      [tableDividasTerra.id]: rowsDividasTerra,
      [tablePagarFornecedores.id]: rowsPagarFornecedores,
      [tableFinanciamentoInsumos.id]: rowsFinanciamentoInsumos,
    }

    const selectedRows = tableMap[tableId]
    if (!selectedRows) return

    const newRow = { inputs: [...selectedRows[0].inputs] }

    const tableUpdaterMap = {
      [tableDividas.id]: setTableDividas,
      [tableDividasTerra.id]: setTableDividasTerra,
      [tablePagarFornecedores.id]: setTablePagarFornecedores,
      [tableFinanciamentoInsumos.id]: setTableFinanciamentoInsumos,
    }

    const updateState = tableUpdaterMap[tableId]
    if (updateState) {
      updateState((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Dívidas</Tittle>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Dívidas
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableDividas.id}
            headers={tableDividas.headers}
            rows={tableDividas.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableDividas.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableDividas.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Dívidas de terra
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableDividasTerra.id}
            headers={tableDividasTerra.headers}
            rows={tableDividasTerra.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableDividasTerra.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableDividasTerra.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Saldo a pagar para fornecedores
        </div>

        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tablePagarFornecedores.id}
            headers={tablePagarFornecedores.headers}
            rows={tablePagarFornecedores.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tablePagarFornecedores.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tablePagarFornecedores.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Financiamento Insumos
        </div>

        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableFinanciamentoInsumos.id}
            headers={tableFinanciamentoInsumos.headers}
            rows={tableFinanciamentoInsumos.rows}
            onInputChange={(updatedData) =>
              handleTableChange(updatedData, tableFinanciamentoInsumos.id)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableFinanciamentoInsumos.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Campo
          </Button>
        </div>
      </div>
    </div>
  )
}
