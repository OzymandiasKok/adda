'use client'
import { TableContainer, type TableProps } from '@/components/table'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface TableAgriculturTotalProps {
  years: number[]
  tables: TableProps[]
}

export function TableAgricuturaTotal({
  years,
  tables,
}: TableAgriculturTotalProps) {
  const headersTotal = [
    {
      content: 'Total do Grupo',
    },
    ...years.map((year) => ({
      content: `${year}/${year + 1}`,
    })),
  ]

  const initialRows = [
    {
      label: 'Receita Total',
      inputs: Array(7).fill({
        value: '',
        inputType: 'number',
        money: true,
        disabled: true,
      }),
    },
    {
      label: 'Custo Total de Produção (R$)',
      inputs: Array(7).fill({
        value: '',
        inputType: 'number',
        money: true,
        disabled: true,
      }),
    },
    {
      label: 'Resultado Bruto',
      inputs: Array(7).fill({
        value: '',
        inputType: 'number',
        money: true,
        disabled: true,
      }),
    },
    {
      label: 'Margem Bruta Ano %',
      inputs: Array(7).fill({
        value: '',
        inputType: 'number',
        disabled: true,
        suffix: true,
      }),
    },
  ]

  const [tableAgriculturaTotal, setTableAgriculturaTotal] =
    useState<TableProps>({
      id: uuidv4(),
      headers: headersTotal,
      rows: initialRows,
    })

  const calcularTotais = (tables: TableProps[], rowIndex: number) => {
    return tables.reduce((acc, table) => {
      table.rows[rowIndex].inputs.forEach((input, index) => {
        const value =
          input.value !== undefined && typeof input.value === 'string'
            ? parseFloat(
                input.value.replace(/[^0-9.,-]/g, '').replace(',', '.'),
              ) || 0
            : 0
        acc[index] = (acc[index] ?? 0) + value
      })
      return acc
    }, Array(7).fill(0))
  }

  useEffect(() => {
    const receitaTotal = calcularTotais(tables, 8)
    const custoTotalProducao = calcularTotais(tables, 9)
    const resultadoBruto = calcularTotais(tables, 10)
    const margem = calcularTotais(tables, 11)

    setTableAgriculturaTotal((prevState) => {
      const updatedRows = prevState.rows.map((row, index) => {
        switch (index) {
          case 0:
            return {
              ...row,
              inputs: receitaTotal.map((value) => ({
                ...row.inputs[0],
                value,
              })),
            }
          case 1:
            return {
              ...row,
              inputs: custoTotalProducao.map((value) => ({
                ...row.inputs[1],
                value,
              })),
            }
          case 2:
            return {
              ...row,
              inputs: resultadoBruto.map((value) => ({
                ...row.inputs[2],
                value,
              })),
            }
          case 3:
            return {
              ...row,
              inputs: margem.map((value) => ({
                ...row.inputs[3],
                value,
              })),
            }
          default:
            return row
        }
      })

      return { ...prevState, rows: updatedRows }
    })
  }, [tables])

  return (
    <TableContainer
      tableId={tableAgriculturaTotal.id}
      headers={headersTotal}
      rows={tableAgriculturaTotal.rows}
    />
  )
}
