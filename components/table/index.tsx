'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { twMerge } from 'tailwind-merge'
import { Input } from '../ui/input'
import { SelectMenu } from '@/app/(home)/(users)/quadros/components/select-menu'
import { NumericFormat } from 'react-number-format'

export interface InputProps {
  value?: number | string
  inputType: string
  placeholder?: string
  formula?: string[]
  ref?: string
  money?: boolean
  disabled?: boolean
  label?: string
  content?: string[]
  suffix?: boolean
}

export interface RowProps {
  label?: string
  inputs: InputProps[]
}

export interface TableProps {
  id: string
  headers: {
    content?: string
  }[]
  rows: RowProps[]
}

export interface HeaderSuperiorProps {
  label: string
  content: string
}

export interface TableContainerProps {
  tableId: string
  headers: TableProps['headers']
  rows: TableProps['rows']
  headerSuperior?: {
    label: string
    content: string[]
  }[]
  headerSuperiorIndex?: number
  onInputChange?: (updatedData: RowProps[], tableId?: string) => void
  onHeaderChange?: (headerIndex: number, index: number, value: string) => void
}

type FormulaToken = string | number

export function TableContainer({
  tableId,
  headers,
  rows,
  headerSuperior,
  headerSuperiorIndex,
  onInputChange,
  onHeaderChange,
}: TableContainerProps) {
  const calculateFormula = (formula: FormulaToken[], rows: RowProps[]) => {
    const values = []
    const operators = []

    // Função para obter valor de referência ou número literal
    const getValue = (token: FormulaToken): number | undefined => {
      if (
        typeof token === 'number' ||
        (!isNaN(parseFloat(token)) &&
          !rows.some((row) =>
            row.inputs.some((input) => input.ref?.toString() === token),
          ))
      ) {
        return parseFloat(token as string)
      }
      let value = 0
      for (const row of rows) {
        const input = row.inputs.find(
          (input) => input.ref?.toString() === token,
        )
        if (input && input.value) {
          value = Number(input.value)
          break
        }
      }
      return isNaN(value) ? undefined : value
    }

    // Processa tokens da fórmula
    for (const token of formula) {
      if (['+', '-', '*', '/'].includes(token as string)) {
        operators.push(token)
      } else {
        const value = getValue(token)
        if (value === undefined) return undefined
        values.push(value)
      }
    }

    if (values.length === 0) return undefined

    // Realiza multiplicação e divisão primeiro
    for (let i = 0; i < operators.length; i++) {
      if (operators[i] === '*' || operators[i] === '/') {
        const operator = operators.splice(i, 1)[0]
        const leftValue = values.splice(i, 1)[0]
        const rightValue = values.splice(i, 1)[0]

        // Verificação de divisão por zero
        if (operator === '/' && rightValue === 0) {
          // console.error('Erro: Divisão por zero')
          return undefined
        }

        const result =
          operator === '*' ? leftValue * rightValue : leftValue / rightValue
        values.splice(i, 0, result)
        i-- // Reajusta o índice após remover o operador
      }
    }

    // Realiza adição e subtração
    let result = values[0]
    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i]
      const value = values[i + 1]
      switch (operator) {
        case '+':
          result += value
          break
        case '-':
          result -= value
          break
      }
    }

    if (
      (formula.includes('110') ||
        formula.includes('111') ||
        formula.includes('112') ||
        formula.includes('113') ||
        formula.includes('114') ||
        formula.includes('115') ||
        formula.includes('116')) &&
      (formula.includes('90') ||
        formula.includes('91') ||
        formula.includes('92') ||
        formula.includes('93') ||
        formula.includes('94') ||
        formula.includes('95') ||
        formula.includes('96'))
    ) {
      result = Math.round(result * 100)
    } else {
      result = Math.round(result * 100) / 100
    }

    return result
  }

  const updateRowsWithFormulas = (updatedRows: RowProps[]) => {
    const newRows = updatedRows.map((row) => ({
      ...row,
      inputs: row.inputs.map((input) => {
        if (input.formula) {
          const calculatedValue = calculateFormula(input.formula, updatedRows)

          return {
            ...input,
            ...input,
            value:
              calculatedValue !== undefined ? calculatedValue.toString() : '',
          }
        }
        return input
      }),
    }))

    // Chama a função de callback para passar os dados atualizados
    onInputChange && onInputChange(newRows, tableId)
  }

  const handleInputChange = (
    rowIndex: number,
    inputIndex: number,
    value: string,
  ) => {
    const updatedRows = rows.map((row, idx) => {
      if (idx === rowIndex) {
        const updatedInputs = row.inputs.map((input, iIdx) => {
          if (iIdx === inputIndex) {
            return { ...input, value }
          }
          return input
        })
        return { ...row, inputs: updatedInputs }
      }
      return row
    })

    updateRowsWithFormulas(updatedRows)
  }

  const handleHeaderSuperiorChange = (
    headerIndex: number,
    index: number,
    value: string,
  ) => {
    if (!headerSuperior || !onHeaderChange) return

    onHeaderChange(headerIndex, index, value)
  }

  return (
    <>
      <div className="flex flex-col overflow-x-hidden">
        {headerSuperior && (
          <div className="flex justify-center gap-5 rounded-t-md border bg-[#BDC4C8] py-2">
            {headerSuperior.map((header, i) => (
              <div key={i} className="flex font-bold">
                <SelectMenu
                  itens={header.content}
                  label={header.label}
                  onValueChange={(value) =>
                    headerSuperiorIndex !== undefined &&
                    handleHeaderSuperiorChange(headerSuperiorIndex, i, value)
                  }
                />
              </div>
            ))}
          </div>
        )}
        <ScrollArea className="w-full whitespace-nowrap rounded-md pb-3">
          <Table className="w-full select-none rounded-lg border border-black bg-[#BDC4C8]">
            <TableRow className="border border-black bg-[#607079]">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className={twMerge(
                    'min-w-[200px] max-w-[200px] border border-black px-4 py-2 text-center text-white',
                  )}
                >
                  {header.content}
                </TableHead>
              ))}
            </TableRow>

            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="bg-[#BDC4C8]">
                  {row.label && (
                    <TableCell className="w-[550px] min-w-[550px] max-w-[550px] border border-black px-4 py-2 text-center">
                      {row.label}
                    </TableCell>
                  )}

                  {row.inputs.map((input, inputIndex) => (
                    <TableCell
                      key={inputIndex}
                      className="min-w-[200px] max-w-[200px] border border-black py-2 text-center"
                    >
                      {input.label ? (
                        <div className="flex justify-center">
                          <SelectMenu
                            itens={input.content || []}
                            label={input.label}
                            onValueChange={(value) =>
                              handleInputChange(rowIndex, inputIndex, value)
                            }
                          />
                        </div>
                      ) : (
                        <>
                          {input.inputType === 'number' || input.formula ? (
                            <NumericFormat
                              value={input.value}
                              onValueChange={(e) =>
                                handleInputChange(rowIndex, inputIndex, e.value)
                              }
                              {...(input.inputType === 'number' && {
                                allowNegative: true,
                                decimalScale: 2,
                                fixedDecimalScale: true,
                                decimalSeparator: ',',
                                thousandSeparator: '.',
                              })}
                              {...(input.money && { prefix: 'R$ ' })}
                              {...(input.suffix && {
                                suffix: ' %',
                                decimalScale: 0,
                              })}
                              className={twMerge(
                                input.formula || input.disabled
                                  ? 'bg-[#BDC4C8]'
                                  : 'bg-white',
                                'cursor-text border-themeColor text-center',
                                'flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed md:text-sm',
                              )}
                            />
                          ) : (
                            <Input
                              type={input.inputType}
                              value={
                                input.inputType !== 'file'
                                  ? input.value
                                  : undefined
                              }
                              placeholder={input.placeholder}
                              disabled={input.formula || input.disabled}
                              className={twMerge(
                                input.formula || input.disabled
                                  ? 'bg-[#BDC4C8]'
                                  : 'bg-white',
                                'cursor-text border-themeColor text-center',
                                input.inputType === 'file' ? 'file-input' : '',
                              )}
                              onChange={(e) => {
                                handleInputChange(
                                  rowIndex,
                                  inputIndex,
                                  e.target.value,
                                )

                                if (input.inputType === 'file') {
                                  const fileInput = e.target as HTMLInputElement
                                  const fileName =
                                    fileInput.files?.[0]?.name ||
                                    'Escolher arquivo'
                                  fileInput.setAttribute(
                                    'data-file-name',
                                    fileName,
                                  )
                                }
                              }}
                              data-file-name="Anexar arquivo"
                            />
                          )}
                        </>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" className="" />
        </ScrollArea>
      </div>
    </>
  )
}
