import { ReactElement } from 'react'

import useWindowSize from '@hooks/useWindowSize'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  color: 'primary' | 'secondary' | 'danger'
  icon?: ReactElement
  small?: boolean
  outlined?: boolean
  className?: string
  onClick?:
    | ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined
  loading?: boolean
  loadingMessage?: string
}

export default function Button({
  label,
  color,
  icon,
  small,
  outlined,
  className,
  loading,
  loadingMessage,
  ...props
}: ButtonProps): ReactElement {
  const renderVariantClasses = () => {
    if (outlined) {
      switch (color) {
        case 'primary':
          return 'bg-white border border-indigo-500 border-opacity-75 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 dark:bg-gray-800 dark:border-indigo-400 dark:text-indigo-300 dark:hover:border-indigo-300 dark:hover:text-indigo-200 focus:ring-indigo-400'
        case 'secondary':
          return 'bg-white border border-purple-500 border-opacity-75 text-purple-500 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 dark:bg-gray-800 dark:border-purple-400 dark:text-purple-300 dark:hover:border-purple-300 dark:hover:text-purple-200 focus:ring-purple-400'
        case 'danger':
          return 'bg-white border border-red-500 border-opacity-75 text-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-50 dark:bg-gray-800 dark:border-red-400 dark:text-red-300 dark:hover:border-red-300 dark:hover:text-red-200 focus:ring-red-400'
      }
    } else {
      switch (color) {
        case 'primary':
          return 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-indigo-400'
        case 'secondary':
          return 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-400'
        case 'danger':
          return 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
      }
    }
  }

  const { width } = useWindowSize()

  return (
    <button
      disabled={loading}
      className={`flex justify-center items-center px-4 py-2 min-w-70 font-semibold transition-colors text-center ${renderVariantClasses()} ${
        small ? 'text-sm' : 'text-md'
      } ${className} focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-900`}
      {...props}
    >
      {icon && <span className={width < 1280 ? '' : 'mr-2'}>{icon}</span>}
      {loading ? loadingMessage : label}
    </button>
  )
}
