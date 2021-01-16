import { ChangeEvent, forwardRef, HTMLProps } from 'react'
import { DeepMap, FieldError } from 'react-hook-form'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string
  value?: string | number
  name: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  errors?: DeepMap<Record<string, unknown>, FieldError>
}

const Input = (
  { label, value, name, onChange, errors, ...props }: InputProps,
  ref
) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label className="font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        {...props}
        className={`py-2 px-3 border ${
          errors && errors[name] ? 'border-red-600' : 'border-gray-200'
        } shadow-sm rounded focus:outline-none focus:ring-1 focus:${
          errors && errors[name] ? 'ring-red-600' : 'ring-indigo-400'
        } dark:bg-gray-800 dark:border-gray-700`}
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        ref={ref}
      />
      {errors && errors[name] && (
        <p className="text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  )
}

export default forwardRef(Input)
