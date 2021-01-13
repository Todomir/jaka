import { ReactElement } from 'react'

interface ButtonProps {
  label: string
  color: 'primary' | 'secondary'
  icon?: ReactElement
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
  icon,
  small,
  outlined,
  className,
  ...props
}: ButtonProps): ReactElement {
  const renderVariantClasses = () => {
    if (outlined) {
      if (color === 'primary') {
        return 'bg-white border border-indigo-500 border-opacity-75 text-indigo-500 hover:border-indigo-600 hover:text-indigo-600 hover:bg-indigo-50 dark:bg-gray-800 dark:border-indigo-400 dark:text-indigo-300 dark:hover:border-indigo-300 dark:hover:text-indigo-200'
      } else {
        return 'bg-white border border-purple-500 border-opacity-75 text-indigo-500 hover:border-purple-600 hover:text-purple-600 hover:bg-purple-50 dark:bg-gray-800 dark:border-purple-400 dark:text-purple-300 dark:hover:border-purple-300 dark:hover:text-purple-200'
      }
    } else {
      if (color === 'primary') {
        return 'bg-indigo-500 text-white hover:bg-indigo-600'
      } else {
        return 'bg-purple-500 text-white hover:bg-purple-600'
      }
    }
  }

  return (
    <button
      className={`flex justify-center items-center px-4 py-2 min-w-70 font-semibold transition-colors ${renderVariantClasses()} ${
        small ? 'text-sm' : 'text-md'
      } ${className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:${
        color === 'primary' ? 'ring-indigo-500' : 'ring-purple-500'
      } dark:ring-offset-gray-900`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  )
}
