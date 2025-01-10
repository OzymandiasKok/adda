import { Button } from '@/components/ui/button'
import { twMerge } from 'tailwind-merge'

interface StepButtonProps {
  step: number
  active?: boolean
  text: string
  isFirst?: boolean
  isLast?: boolean
}

export function StepButton({
  step,
  active = false,
  text,
  isFirst,
  isLast,
}: StepButtonProps) {
  return (
    <div className="relative flex flex-1 flex-col items-center gap-7 text-center">
      <Button
        className={twMerge(
          active ? 'cursor-pointer' : 'cursor-default',
          'size-[80px] rounded-2xl bg-themeColor text-5xl font-bold',
        )}
      >
        {step}
      </Button>
      <span className="text-balance text-2xl font-bold text-themeColor">
        {text}
      </span>
      {!isFirst && (
        <div className="absolute left-0 top-[20%] h-1 w-[50px] bg-themeColor" />
      )}

      {!isLast && (
        <div className="absolute right-0 top-[20%] h-1 w-[50px] bg-themeColor" />
      )}
    </div>
  )
}
