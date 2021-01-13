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
    if (darkMode) {
      document.body.classList.add('dark', 'bg-gray-900', 'text-white')
    } else {
      document.body.classList.remove('dark', 'bg-gray-900', 'text-white')
    }
  }, [darkMode])

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  )
}
