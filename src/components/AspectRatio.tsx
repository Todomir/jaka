import { ReactElement, ReactNode, ReactNodeArray } from 'react'

interface AspectRatioProps {
  children: ReactElement | ReactNode | ReactNodeArray
  ratio: number
}

export default function AspectRatio({
  ratio,
  children
}: AspectRatioProps): ReactElement {
  return (
    <div
      style={{ paddingBottom: `${(1 / ratio) * 100}%` }}
      className="relative w-full h-0"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
