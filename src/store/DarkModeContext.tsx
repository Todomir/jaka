import {
  createContext,
  DispatchWithoutAction,
  ReactElement,
  ReactNode
} from 'react'

import useToggle from '@hooks/useToggle'

interface IDarkMode {
  darkMode: boolean
  toggleDarkMode: DispatchWithoutAction
}

interface Props {
  children: ReactNode | [ReactNode]
}

export const DarkModeContext = createContext<IDarkMode | null>(null)

export default function DarkModeProvider({ children }: Props): ReactElement {
  const [darkMode, toggleDarkMode] = useToggle(true)

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
