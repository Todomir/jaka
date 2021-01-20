import {
  createContext,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  useCallback,
  useState
} from 'react'

import ToastContainer from '@components/Toast/ToastContainer'

import produce from 'immer'

export interface IToast {
  id: string
  title: string
  description: string
  status: 'success' | 'danger' | 'info' | 'warning'
  duration?: number
}

export type ToastArray = Array<IToast>

export const ToastContext = createContext(null)

interface ToastProviderProps {
  children: ReactNode | ReactNodeArray | ReactElement
}

export default function ToastProvider({
  children
}: ToastProviderProps): ReactElement {
  const [toasts, setToasts] = useState<ToastArray>([])

  const addToast = useCallback(
    ({ title, description, status, duration }) => {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        document.body.style.overflow = 'auto'
      }, 300)
      setToasts(
        produce(toasts => {
          toasts.push({ id: Date.now(), title, description, status, duration })
        })
      )
    },
    [setToasts]
  )

  const removeToast = useCallback(
    id => {
      setToasts(toasts => {
        document.body.style.overflow = 'hidden'
        setTimeout(() => {
          document.body.style.overflow = 'auto'
        }, 300)
        return toasts.filter(t => t.id !== id)
      })
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}
