import {
  createContext,
  DispatchWithoutAction,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  useEffect
} from 'react'

import useToggle from '@hooks/useToggle'

interface IDarkMode {
  darkMode: boolean
  toggleDarkMode: DispatchWithoutAction
}

interface Props {
  children: ReactNode | ReactNodeArray
}

export const DarkModeContext = createContext<IDarkMode | null>(null)

export default function DarkModeProvider({ children }: Props): ReactElement {
  const [darkMode, toggleDarkMode] = useToggle()

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
