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
    <div className="fixed text-xs bottom-0 left-1/2 w-80 -ml-40 p-4 mb-16 sm:mb-10 z-50">
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
