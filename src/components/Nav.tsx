import Image from 'next/image'

import { ReactElement, useContext } from 'react'

import { DarkModeContext } from '@store/DarkModeContext'

import Button from './Button'
import Switch from './Switch'

export default function Nav(): ReactElement {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <nav>
      <section className="px-10 py-5 fixed w-full bg-white flex justify-between items-center dark:bg-gray-900 z-50">
        <div className="w-full sm:w-auto flex justify-between sm:justify-start items-center space-x-4">
          <Image src="/logo.svg" layout="fixed" width={24} height={24} />
          <p className="h-6 hidden sm:block font-black font-cursive text-xl tracking-tighter dark:text-white">
            JAKA
          </p>
          <Switch value={darkMode} toggle={toggleDarkMode} darkMode />
        </div>

        <div className="hidden sm:flex space-x-10">
          <Button label="Login" color="primary" small />
          <Button label="Sign in" color="primary" outlined small />
        </div>
      </section>
    </nav>
  )
}
