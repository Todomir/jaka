import {
  DispatchWithoutAction,
  ReactElement,
  ReactNode,
  ReactNodeArray
} from 'react'

import { AnimatePresence, motion } from 'framer-motion'

import Button from './Button'
import Icon from './Icon'

interface ModalProps {
  show: boolean
  toggle: DispatchWithoutAction
  children: ReactNode | ReactNodeArray | ReactElement
}

export default function Modal({
  show,
  toggle,
  children
}: ModalProps): ReactElement {
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
            className="bg-gray-50 w-4/12 p-7 rounded-lg mx-auto my-52 dark:bg-gray-800"
          >
            {children}
            <footer className="-m-7 py-5 px-7 mt-12 flex justify-between space-x-5 bg-gray-100 border-t border-gray-300 rounded-b-lg dark:bg-gray-700 dark:border-gray-500">
              <Button
                className="w-full"
                color="primary"
                icon={<Icon icon="plus" />}
                label="Save task"
              />
              <Button
                className="w-full dark:bg-gray-700"
                color="primary"
                label="Cancel"
                outlined
                onClick={toggle}
              />
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
