'use client'

import {
  TableContainer,
  type HeaderSuperiorProps,
  type RowProps,
  type TableProps,
} from '@/components/table'
import { Button } from '@/components/ui/button'
import { TableAgricuturaTotal } from './table-agricultura-total'
import { Tittle } from '@/components/tittle'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useEstadoMunicipio from '@/app/hooks/useEstadoMunicipio'
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

const header = [
  {
    content: 'Cultura',
  },
  ...years.map((year) => ({
    content: `${year}/${year + 1}`,
  })),
]

const rows = [
  {
    label: 'Área (ha)',
    inputs: [
      { value: '', inputType: 'number', ref: '10' },
      { value: '', inputType: 'number', ref: '11' },
      { value: '', inputType: 'number', ref: '12' },
      { value: '', inputType: 'number', ref: '13' },
      { value: '', inputType: 'number', ref: '14' },
      { value: '', inputType: 'number', ref: '15' },
      { value: '', inputType: 'number', ref: '16' },
    ],
  },
  {
    label: 'Produtividade (Sacas/ha)',
    inputs: [
      { value: '', inputType: 'number', ref: '20' },
      { value: '', inputType: 'number', ref: '21' },
      { value: '', inputType: 'number', ref: '22' },
      { value: '', inputType: 'number', ref: '23' },
      { value: '', inputType: 'number', ref: '24' },
      { value: '', inputType: 'number', ref: '25' },
      { value: '', inputType: 'number', ref: '26' },
    ],
  },
  {
    label: 'Produção Total (Sacas)',
    inputs: [
      {
        value: '',
        formula: ['10', '*', '20'],
        inputType: 'number',
        ref: '30',
      },
      {
        value: '',
        formula: ['11', '*', '21'],
        inputType: 'number',
        ref: '31',
      },
      {
        value: '',
        formula: ['12', '*', '22'],
        inputType: 'number',
        ref: '32',
      },
      {
        value: '',
        formula: ['13', '*', '23'],
        inputType: 'number',
        ref: '33',
      },
      {
        value: '',
        formula: ['14', '*', '24'],
        inputType: 'number',
        ref: '34',
      },
      {
        value: '',
        formula: ['15', '*', '25'],
        inputType: 'number',
        ref: '35',
      },
      {
        value: '',
        formula: ['16', '*', '26'],
        inputType: 'number',
        ref: '36',
      },
    ],
  },
  {
    label: 'Preço Médio Final (R$/Sc)',
    inputs: [
      { value: '', inputType: 'number', ref: '40', money: true },
      { value: '', inputType: 'number', ref: '41', money: true },
      { value: '', inputType: 'number', ref: '42', money: true },
      { value: '', inputType: 'number', ref: '43', money: true },
      { value: '', inputType: 'number', ref: '44', money: true },
      { value: '', inputType: 'number', ref: '45', money: true },
      { value: '', inputType: 'number', ref: '46', money: true },
    ],
  },
  {
    label: 'Custo Agrícola de Produção (R$/ha)',
    inputs: [
      { value: '', inputType: 'number', ref: '50', money: true },
      { value: '', inputType: 'number', ref: '51', money: true },
      { value: '', inputType: 'number', ref: '52', money: true },
      { value: '', inputType: 'number', ref: '53', money: true },
      { value: '', inputType: 'number', ref: '54', money: true },
      { value: '', inputType: 'number', ref: '55', money: true },
      { value: '', inputType: 'number', ref: '56', money: true },
    ],
  },
  {
    label: 'Sacas Comercializadas (entrega física) (Sacas)',
    inputs: [
      { value: '', inputType: 'number', ref: '60' },
      { value: '', inputType: 'number', ref: '61' },
      { value: '', inputType: 'number', ref: '62' },
      { value: '', inputType: 'number', ref: '63' },
      { value: '', inputType: 'number', ref: '64' },
      { value: '', inputType: 'number', ref: '65' },
      { value: '', inputType: 'number', ref: '66' },
    ],
  },
  {
    label: 'Estoque Final Carregado (Sacas)',
    inputs: [
      {
        value: '',
        formula: ['30', '-', '60'],
        inputType: 'number',
        ref: '70',
      },
      {
        value: '',
        formula: ['31', '-', '61'],
        inputType: 'number',
        ref: '71',
      },
      {
        value: '',
        formula: ['32', '-', '62'],
        inputType: 'number',
        ref: '72',
      },
      {
        value: '',
        formula: ['33', '-', '63'],
        inputType: 'number',
        ref: '73',
      },
      {
        value: '',
        formula: ['34', '-', '64'],
        inputType: 'number',
        ref: '74',
      },
      {
        value: '',
        formula: ['35', '-', '65'],
        inputType: 'number',
        ref: '75',
      },
      {
        value: '',
        formula: ['36', '-', '66'],
        inputType: 'number',
        ref: '76',
      },
    ],
  },
  {
    label: 'Custo Sacas/Hectare (Sacas/ha)',
    inputs: [
      {
        value: '',
        formula: ['50', '/', '40'],
        inputType: 'number',
        ref: '80',
        money: true,
      },
      {
        value: '',
        formula: ['51', '/', '41'],
        inputType: 'number',
        ref: '81',
        money: true,
      },
      {
        value: '',
        formula: ['52', '/', '42'],
        inputType: 'number',
        ref: '82',
        money: true,
      },
      {
        value: '',
        formula: ['53', '/', '43'],
        inputType: 'number',
        ref: '83',
        money: true,
      },
      {
        value: '',
        formula: ['54', '/', '44'],
        inputType: 'number',
        ref: '84',
        money: true,
      },
      {
        value: '',
        formula: ['55', '/', '45'],
        inputType: 'number',
        ref: '85',
        money: true,
      },
      {
        value: '',
        formula: ['56', '/', '46'],
        inputType: 'number',
        ref: '86',
        money: true,
      },
    ],
  },
  {
    label: 'Receita Total (R$)',
    inputs: [
      {
        value: '',
        formula: ['30', '*', '40'],
        inputType: 'number',
        ref: '90',
        money: true,
      },
      {
        value: '',
        formula: ['31', '*', '41'],
        inputType: 'number',
        ref: '91',
        money: true,
      },
      {
        value: '',
        formula: ['32', '*', '42'],
        inputType: 'number',
        ref: '92',
        money: true,
      },
      {
        value: '',
        formula: ['33', '*', '43'],
        inputType: 'number',
        ref: '93',
        money: true,
      },
      {
        value: '',
        formula: ['34', '*', '44'],
        inputType: 'number',
        ref: '94',
        money: true,
      },
      {
        value: '',
        formula: ['35', '*', '45'],
        inputType: 'number',
        ref: '95',
        money: true,
      },
      {
        value: '',
        formula: ['36', '*', '46'],
        inputType: 'number',
        ref: '96',
        money: true,
      },
    ],
  },
  {
    label: 'Custo Total de Produção (R$)',
    inputs: [
      {
        value: '',
        inputType: 'number',
        formula: ['50', '*', '10'],
        ref: '100',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['51', '*', '11'],
        ref: '101',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['52', '*', '12'],
        ref: '102',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['53', '*', '13'],
        ref: '103',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['54', '*', '14'],
        ref: '104',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['55', '*', '15'],
        ref: '105',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['56', '*', '16'],
        ref: '106',
        money: true,
      },
    ],
  },
  {
    label: 'Resultado Bruto (R$)',
    inputs: [
      {
        value: '',
        inputType: 'number',
        formula: ['90', '-', '100'],
        ref: '110',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['91', '-', '101'],
        ref: '111',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['92', '-', '102'],
        ref: '112',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['93', '-', '103'],
        ref: '113',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['94', '-', '104'],
        ref: '114',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['95', '-', '105'],
        ref: '115',
        money: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['96', '-', '106'],
        ref: '116',
        money: true,
      },
    ],
  },
  {
    label: 'Margem (%)',
    inputs: [
      {
        value: '',
        inputType: 'number',
        formula: ['110', '/', '90'],
        ref: '120',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['111', '/', '91'],
        ref: '121',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['112', '/', '92'],
        ref: '122',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['113', '/', '93'],
        ref: '123',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['114', '/', '94'],
        ref: '124',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['115', '/', '95'],
        ref: '125',
        suffix: true,
      },
      {
        value: '',
        inputType: 'number',
        formula: ['116', '/', '96'],
        ref: '126',
        suffix: true,
      },
    ],
  },
]

export default function TableAgricultura() {
  const {
    tableGroup,
    isTableGroupLoading,
    idEmpresaParam,
    handleTableGroupChange,
  } = useTablesContext()
  const [tablesData, setTablesData] = useState<TableProps[]>([
    {
      id: uuidv4(),
      headers: header,
      rows,
    },
  ])

  const { estados, municipios, setSelectedEstado } = useEstadoMunicipio()

  const headerSuperior = [
    {
      label: 'Cultura',
      content: ['Café', 'Soja', 'Milho', 'Algodão', 'Sorgo'],
    },
    {
      label: 'Sistema',
      content: ['Irrigado', 'Não Irrigado'],
    },
    {
      label: 'Estado',
      content: estados.map((estado) => estado.sigla),
    },
    {
      label: 'Município',
      content: municipios.map((municipio) => municipio.nome),
    },
  ]

  const [headerSuperiorValues, setHeaderSuperiorValues] = useState<
    HeaderSuperiorProps[][]
  >([
    headerSuperior.map((item) => ({
      label: item.label,
      content: '',
    })),
  ])

  useEffect(() => {
    if (isTableGroupLoading) {
      Object.values(tableGroup).forEach((tableGroupItem) => {
        if (
          String(tableGroupItem.empresaID) === idEmpresaParam &&
          tableGroupItem.agricultura.tables.length > 0
        ) {
          setTablesData(tableGroupItem.agricultura.tables)
        }
      })
    }
  }, [isTableGroupLoading])

  useEffect(() => {
    if (tablesData.length > headerSuperiorValues.length) {
      const newHeaderSuperiorValues = Array.from(
        { length: tablesData.length },
        (_, index) => {
          return headerSuperior.map((item) => ({
            label: item.label,
            content: '',
          }))
        },
      )
      setHeaderSuperiorValues(newHeaderSuperiorValues)
    }
  }, [tablesData])

  useEffect(() => {
    if (tablesData.length === headerSuperiorValues.length) {
      const adjustedHeaderSuperiorValues = tablesData.map((_, index) => {
        return headerSuperiorValues[index]
          ? headerSuperiorValues[index]
          : headerSuperior.map((item) => ({
              label: item.label,
              content: '',
            }))
      })

      const combinedTables = tablesData.map((table, index) => ({
        ...table,
        headerSuperior: adjustedHeaderSuperiorValues[index],
      }))

      const updatedTableGroupData = {
        tables: combinedTables,
      }

      handleTableGroupChange(updatedTableGroupData, 'agricultura')
    }
  }, [tablesData, headerSuperiorValues])

  const handleTableDataChange = (updatedData: RowProps[], tableId: string) => {
    const updatedTables = tablesData.map((table) =>
      table.id === tableId
        ? {
            ...table,
            rows: updatedData.map((row) => ({ ...row })),
          }
        : table,
    )

    setTablesData(updatedTables)
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
          return item.map((header, headerIndex) => {
            if (headerIndex === index) {
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

      if (headerIndex === 0 && index === 2) {
        setSelectedEstado(value)
      }

      return updatedValues
    })
  }

  function addNewTable() {
    const newTable: TableProps = {
      id: uuidv4(),
      headers: header,
      rows,
    }

    const newHeaderSuperior: HeaderSuperiorProps[] = headerSuperior.map(
      (item) => ({
        label: item.label,
        content: '',
      }),
    )

    setTablesData([...tablesData, newTable])
    setHeaderSuperiorValues([...headerSuperiorValues, newHeaderSuperior])
  }

  return (
    <div className="flex flex-col gap-10">
      <Tittle>Quadro Safra - Agricultura</Tittle>

      <div className="flex flex-col gap-5">
        {tablesData.map((table, i) => (
          <>
            <TableContainer
              key={table.id}
              tableId={table.id}
              headers={table.headers}
              rows={table.rows}
              headerSuperior={headerSuperior}
              headerSuperiorIndex={i}
              onInputChange={(updatedData) =>
                handleTableDataChange(updatedData, table.id)
              }
              onHeaderChange={handleUpdateHeaderSuperior}
            />
          </>
        ))}
      </div>

      <Button
        onClick={addNewTable}
        className="mr-auto bg-themeColor px-8 py-6 text-2xl"
      >
        Nova Cultura
      </Button>

      <TableAgricuturaTotal years={years} tables={tablesData} />
    </div>
  )
}
