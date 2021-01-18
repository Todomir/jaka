import { ReactElement } from 'react'

import { ToastArray } from '@store/ToastContext'

import { AnimatePresence } from 'framer-motion'

import Toast from './Toast'

type ToastContainerProps = {
  toasts: ToastArray
}

export default function ToastContainer({
  toasts
}: ToastContainerProps): ReactElement {
  return (
    <div className="absolute w-64 -ml-32 left-1/2 bottom-0 z-50 p-4">
      <AnimatePresence>
        {toasts.map(item => (
          <Toast
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            status={item.status}
            duration={item.duration}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
