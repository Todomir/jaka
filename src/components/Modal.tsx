import {
  DispatchWithoutAction,
  ReactElement,
  ReactNode,
  ReactNodeArray
} from 'react'

import { AnimatePresence, motion } from 'framer-motion'
interface ModalProps {
  show: boolean
  toggle: DispatchWithoutAction
  children: ReactNode | ReactNodeArray | ReactElement
}

export default function Modal({ show, children }: ModalProps): ReactElement {
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gray-50 w-11/12 sm:w-10/12 lg:w-6/12 p-7 rounded-lg mx-auto my-52 dark:bg-gray-800"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
