import { ChangeEvent, HTMLProps, ReactElement } from 'react'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  value?: string | number
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  label,
  value,
  onChange,
  ...props
}: InputProps): ReactElement {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label className="font-semibold" htmlFor={label}>
        {label}
      </label>
      <input
        {...props}
        className="py-2 px-3 border border-gray-200 shadow-sm rounded focus:outline-none focus:ring-1 focus:ring-indigo-400"
        value={value}
        onChange={onChange}
        name={label}
        id={label}
      />
    </div>
  )
}
