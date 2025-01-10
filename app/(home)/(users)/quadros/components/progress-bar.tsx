'use client'

import { twMerge } from 'tailwind-merge'

interface ProgressBarProps {
  progressPercent: number
}

export function ProgressBar({ progressPercent }: ProgressBarProps) {
  const calculateWidth =
    progressPercent < 4
      ? progressPercent * 10
      : progressPercent === 4
        ? 60
        : 60 + (progressPercent - 4) * 10

  console.log(calculateWidth)

  return (
    <>
      <div
        style={{ width: `${calculateWidth}%` }}
        className="absolute left-5 z-30 h-1 rounded-full bg-themeColor"
      />
      <div
        className={twMerge('absolute h-1 w-[95%] rounded-full bg-zinc-300')}
      />
    </>
  )
}
