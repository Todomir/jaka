import { ReactElement, useEffect } from 'react'

import useToast from '@hooks/useToast'

import { IToast } from '@store/ToastContext'

import { motion } from 'framer-motion'

type ToastProps = IToast

export default function Toast({
  id,
  title,
  description,
  duration,
  status
}: ToastProps): ReactElement {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, duration || 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [id, removeToast])

  const renderStatusClasses = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500 text-white'
      case 'danger':
        return 'bg-red-500 text-white'
      case 'info':
        return 'bg-blue-500 text-white'
      case 'warning':
        return 'bg-yellow-500 text-gray-900'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ scale: 0.95, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative py-4 px-6 w-full rounded-lg shadow-lg tracking-tight mb-2 ${renderStatusClasses()}`}
    >
      <header className="text-lg font-bold w-full">{title}</header>
      <main className="text-sm w-full break-words">{description}</main>
    </motion.div>
  )
}
