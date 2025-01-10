import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface RowProps {
  label: string
  unit?: string
  inputs: ReactNode[]
}

interface TableProps {
  headers?: {
    label: string
    colSpan: number
  }[]
  subHeaders?: { content: ReactNode }[]
  rows: RowProps[]
}
export function TableContainer({ headers, subHeaders, rows }: TableProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <Table className="w-full select-none rounded-lg border border-black bg-[#BDC4C8]">
        <TableHeader>
          {/* cabeçalho principal */}
          <TableRow>
            {headers?.map((header) => (
              <TableHead
                key={header.label}
                colSpan={header.colSpan}
                className="border border-black px-4 py-2 text-center font-bold text-black"
              >
                {header.label}
              </TableHead>
            ))}
          </TableRow>
          {/* subCabeçalho */}
          {subHeaders && (
            <TableRow className="border border-black bg-gray-100">
              {subHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  colSpan={index === 5 ? 2 : 1}
                  className={twMerge(
                    index === 5 || index === 9
                      ? 'bg-[#2B414C]'
                      : 'bg-[#607079]',
                    'border border-black px-4 py-2 text-center text-white',
                  )}
                >
                  {header.content}
                </TableHead>
              ))}
            </TableRow>
          )}
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index} className="bg-[#BDC4C8]">
              <TableCell
                colSpan={row.unit ? 5 : 7}
                className="border border-black px-4 py-2 text-center"
              >
                {row.label}
              </TableCell>
              {row.unit && (
                <TableCell
                  colSpan={2}
                  className="border border-black px-4 py-2 text-center text-gray-700"
                >
                  {row.unit}
                </TableCell>
              )}
              {row.inputs?.map((input, i) => (
                <TableCell
                  key={i}
                  className="w-10 border border-black py-2 text-center"
                >
                  {input}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
