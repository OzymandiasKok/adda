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

const headerAreasProprias = [
  { content: 'Nome da Fazenda' },
  { content: 'Proprietário(s)' },
  { content: 'Município' },
  { content: 'Área Total (ha)' },
  { content: 'Área Produtiva (ha)' },
  { content: 'Valor de Mercado (R$)' },
  { content: 'Culturas Praticadas' },
  { content: 'Disponível para Garantia?' },
  { content: 'Anexar matrícula' },
]

const rowsAreasProprias = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o nome',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o proprietário' },
      { value: '', inputType: 'text', placeholder: 'Insira o município' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      {
        inputType: 'select',
        label: 'Selecione',
        content: ['Sim', 'Não'],
        value: '',
      },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

const headerArrendamentos = [
  { content: 'Nome da Fazenda' },
  { content: 'Nome do arrendador' },
  { content: 'Município' },
  { content: 'Área Total (ha)' },
  { content: 'Área Produtiva (ha)' },
  { content: 'Valor de Mercado (R$)' },
  { content: 'Culturas Praticadas' },
  { content: 'Disponível para Garantia?' },
  { content: 'Anexar contrato' },
]

const rowsArrendamentos = [
  {
    inputs: [
      {
        value: '',
        inputType: 'text',
        placeholder: 'Insira o nome',
      },
      { value: '', inputType: 'text', placeholder: 'Insira o arrendador' },
      { value: '', inputType: 'text', placeholder: 'Insira o município' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      { value: '', inputType: 'number', placeholder: '-' },
      {
        inputType: 'select',
        label: 'Selecione',
        content: ['Sim', 'Não'],
        value: '',
      },
      { inputType: 'file', placeholder: '' },
    ],
  },
]

export function TableFazendas() {
  const { tableGroup, idEmpresaParam, handleTableGroupChange } =
    useTablesContext()

  const [tableAreasProprias, setTableAreasProprias] = useState<TableProps>({
    id: uuidv4(),
    headers: headerAreasProprias,
    rows: rowsAreasProprias,
  })
  const [tableArrendamentos, setTableArrendamentos] = useState<TableProps>({
    id: uuidv4(),
    headers: headerArrendamentos,
    rows: rowsArrendamentos,
  })

  useEffect(() => {
    Object.values(tableGroup).forEach((tableGroupItem) => {
      if (
        String(tableGroupItem.empresaID) === idEmpresaParam &&
        tableGroupItem.fazendas.tables.length > 0
      ) {
        const tableAreasProprias = tableGroupItem.fazendas.tables[0]
        setTableAreasProprias(tableAreasProprias)

        const tableArrendamentos = tableGroupItem.fazendas.tables[1]
        setTableArrendamentos(tableArrendamentos)
      }
    })
  }, [idEmpresaParam])

  useEffect(() => {
    const allTables = [tableAreasProprias, tableArrendamentos]

    if (allTables) {
      const tables = allTables.map((table) => ({
        ...table,
      }))

      const updatedTableGroupData = {
        tables,
      }

      handleTableGroupChange(updatedTableGroupData, 'fazendas')
    }
  }, [tableAreasProprias, tableArrendamentos])

  const handleTableAreasPropriasChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tableAreasProprias,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTableAreasProprias(updatedTable)
  }

  const handleTableArrendamentosChange = (updatedData: RowProps[]) => {
    const updatedTable = {
      ...tableArrendamentos,
      rows: updatedData.map((row) => ({ ...row })),
    }
    setTableArrendamentos(updatedTable)
  }

  const handleAddNewField = (tableId: string) => {
    if (tableId === tableAreasProprias.id) {
      const newRow = { inputs: [...rowsAreasProprias[0].inputs] }
      setTableAreasProprias((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    } else if (tableId === tableArrendamentos.id) {
      const newRow = { inputs: [...rowsArrendamentos[0].inputs] }
      setTableArrendamentos((prevState) => ({
        ...prevState,
        rows: [...prevState.rows, newRow],
      }))
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Fazendas</Tittle>

      {/* areas proprias */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Áreas Próprias
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableAreasProprias.id}
            headers={tableAreasProprias.headers}
            rows={tableAreasProprias.rows}
            onInputChange={(updatedData) =>
              handleTableAreasPropriasChange(updatedData)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableAreasProprias.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Nova Fazenda
          </Button>
        </div>
      </div>

      {/* arrendamentos */}
      <div className="flex flex-col">
        <div className="relative -bottom-1 left-0.5 z-50 w-[552px] rounded-t-md bg-themeColor p-2 text-center font-bold text-white">
          Arrendamentos
        </div>
        <div className="flex flex-col gap-5">
          <TableContainer
            tableId={tableArrendamentos.id}
            headers={tableArrendamentos.headers}
            rows={tableArrendamentos.rows}
            onInputChange={(updatedData) =>
              handleTableArrendamentosChange(updatedData)
            }
          />

          <Button
            onClick={() => handleAddNewField(tableArrendamentos.id)}
            className="mr-auto bg-themeColor px-8 py-6 text-2xl"
          >
            Novo Arrendamento
          </Button>
        </div>
      </div>
    </div>
  )
}
