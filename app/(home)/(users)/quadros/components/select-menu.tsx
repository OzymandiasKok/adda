'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from '@/components/ui/select'

import Tippy from '@tippyjs/react'
import { useState } from 'react'
import 'tippy.js/dist/tippy.css'

interface SelectMenuProps {
  label: string
  itens: string[]
  onValueChange: (value: string) => void
}

export function SelectMenu({ label, itens, onValueChange }: SelectMenuProps) {
  const [selectedValue, setSelectedValue] = useState<string>(label)

  return (
    <Select
      onValueChange={(value) => {
        setSelectedValue(value)
        onValueChange(value)
      }}
    >
      <Tippy content={selectedValue}>
        <SelectTrigger className="max-w-40 border-none outline-none ring-0">
          <SelectValue placeholder={label} className="" />
        </SelectTrigger>
      </Tippy>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {itens.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
