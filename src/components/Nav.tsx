import Image from 'next/image'
import Link from 'next/link'

import { ReactElement, useContext } from 'react'

import { DarkModeContext } from '@store/DarkModeContext'

import Button from './Button'
import Icon from './Icon'
import Switch from './Switch'

export default function Nav(): ReactElement {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <nav>
      <section className="px-10 py-5 fixed w-full bg-white flex justify-between items-center dark:bg-gray-900 z-50">
        <div className="w-full sm:w-auto flex justify-between sm:justify-start items-center space-x-4">
          <Image
            alt="JAKA Logo"
            src="/logo.svg"
            layout="fixed"
            width={24}
            height={24}
          />
          <p className="h-6 hidden sm:block font-black font-cursive text-xl tracking-tighter dark:text-white">
            JAKA
          </p>
          <Switch value={darkMode} toggle={toggleDarkMode} darkMode />
        </div>

        <div className="hidden sm:flex space-x-10">
          <Link href="/login">
            <Button
              label="Login"
              icon={<Icon icon="login" size={24} stroke={2} />}
              color="primary"
              small
            />
          </Link>
          <Link href="/register">
            <Button
              label="Sign in"
              icon={<Icon icon="signin" size={24} stroke={2} />}
              color="primary"
              outlined
              small
            />
          </Link>
        </div>
      </section>

      <section className="fixed bottom-0 w-full h-12 flex overflow-x-auto sm:hidden">
        <div className="flex justify-evenly items-center w-2/3 mx-auto bg-indigo-500 text-white border rounded-t-xl">
          <Link href="/login">
            <div className="flex flex-col justify-center items-center cursor-pointer transition-colors hover:text-indigo-200">
              <Icon icon="login" size={18} stroke={2} />
              <p className="text-xs font-semibold tracking-tight">Login</p>
            </div>
          </Link>
          <Link href="/register">
            <div className="flex flex-col justify-center items-center cursor-pointer transition-colors hover:text-indigo-200">
              <Icon icon="signin" size={18} stroke={2} />
              <p className="text-xs font-semibold tracking-tight">Sign in</p>
            </div>
          </Link>
        </div>
      </section>
    </nav>
  )
}
