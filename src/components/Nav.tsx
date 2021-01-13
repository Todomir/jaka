import { ReactElement, useContext } from 'react'

import { DarkModeContext } from '@store/DarkModeContext'

import Button from './Button'
import Switch from './Switch'

export default function Nav(): ReactElement {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <nav>
      <section className="px-10 py-5 fixed w-full bg-white flex justify-between items-center dark:bg-gray-900 z-50">
        <div className="flex justify-center items-center space-x-5">
          <p className="h-6 font-black font-cursive text-xl tracking-tighter dark:text-white">
            JAKA
          </p>
          <Switch value={darkMode} toggle={toggleDarkMode} darkMode />
        </div>

        <div className="flex space-x-10">
          <Button label="Login" color="primary" small />
          <Button label="Register now" color="primary" outlined small />
        </div>
      </section>
    </nav>
  )
}
