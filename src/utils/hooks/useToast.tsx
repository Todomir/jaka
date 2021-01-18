import { useContext } from 'react'

import { ToastContext } from '@store/ToastContext'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useToast() {
  return useContext(ToastContext)
}
