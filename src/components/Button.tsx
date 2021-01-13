import { ReactElement } from 'react'

interface ButtonProps {
  label: string
  color: 'primary' | 'secondary'
  small?: boolean
  outlined?: boolean
  className?: string
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
}

export default function Button({
  label,
  color,
  small,
  outlined,
  className,
  ...props
}: ButtonProps): ReactElement {
  const renderVariantClasses = () => {
    if (outlined) {
      if (color === 'primary') {
        return 'bg-white border border-indigo-300 border-opacity-75 text-indigo-300 hover:border-indigo-400 hover:text-indigo-400 hover:bg-indigo-50 dark:bg-gray-800'
      } else {
        return 'bg-white border border-purple-300 border-opacity-75 text-indigo-300 hover:border-purple-400 hover:text-purple-400 hover:bg-purple-50 dark:bg-gray-800'
      }
    } else {
      if (color === 'primary') {
        return 'bg-indigo-300 text-white hover:bg-indigo-400'
      } else {
        return 'bg-purple-300 text-white hover:bg-purple-400'
      }
    }
  }

  return (
    <button
      className={`flex justify-center items-center px-4 py-2 min-w-70 font-semibold transition-colors ${renderVariantClasses()} ${
        small ? 'text-sm' : 'text-md'
      } ${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${
        color === 'primary' ? 'ring-indigo-300' : 'ring-purple-300'
      } dark:ring-offset-gray-900`}
      {...props}
    >
      {label}
    </button>
  )
}
