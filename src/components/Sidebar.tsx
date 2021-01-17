import { useRouter } from 'next/router'

import { ReactElement, useContext } from 'react'

import useToggle from '@hooks/useToggle'

import { DarkModeContext } from '@store/DarkModeContext'

import { destroyCookie } from 'nookies'

import Button from './Button'
import Icon from './Icon'
import ActiveLink from './Link'
import Modal from './Modal'
import Switch from './Switch'

interface SidebarProps {
  user: { _id?: string; name: string; email: string }
}

export default function Sidebar({ user }: SidebarProps): ReactElement {
  const [logout, toggleLogout] = useToggle()
  const [showModal, toggleModal] = useToggle()
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)

  const router = useRouter()

  return (
    <>
      <Modal show={showModal} toggle={toggleModal}>
        <form className="flex flex-col">
          <label className="font-bold text-2xl text-indigo-300 tracking-tighter">
            Create a new task with JAKA
          </label>
          <label className="text-base text-gray-400 tracking-tighter">
            Click on the labels to edit its content
          </label>
        </form>
      </Modal>
      <aside className="fixed bottom-0 w-full sm:row-start-1 sm:col-start-1 sm:relative justify-between sm:justify-start flex sm:flex-col h-12 sm:w-auto xl:w-72 sm:h-full px-2 md:px-5 py-2 sm:py-5 bg-gray-100 border border-indigo-50 rounded shadow-sm transition-colors duration-500 dark:bg-gray-800 dark:border-gray-700">
        <header className="flex justify-center items-center">
          <p className="text-xl font-bold tracking-tight text-indigo-400 mr-3 hidden md:block">
            {user.name.replace(/ .*/, '')}
          </p>
          <Switch value={darkMode} toggle={toggleDarkMode} darkMode />
        </header>
        <article className="sm:-mx-2 md:-mx-5 md:text-sm flex sm:flex-col justify-center items-center md:justify-start md:items-stretch sm:space-y-2 sm:mt-10">
          <ActiveLink
            href="/dashboard"
            activeClassName="flex bg-white text-indigo-400 shadow-sm border-b-4 sm:border-b-0 sm:border-l-4 border-indigo-400 dark:bg-gray-600 dark:text-indigo-300 dark:border-indigo-300"
          >
            <a className="flex items-center space-x-3 text-gray-500 px-4 py-2 font-semibold transition-colors hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-300">
              <Icon icon="boards" /> <p className="hidden md:block">Boards</p>
            </a>
          </ActiveLink>

          <ActiveLink
            href="/profile"
            activeClassName="flex bg-white text-indigo-500 shadow-sm border-b-4 sm:border-l-4 border-indigo-500"
          >
            <a className="flex items-center space-x-3 text-gray-500 px-4 py-2 font-semibold transition-colors hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-300">
              <Icon icon="user" /> <p className="hidden md:block">My profile</p>
            </a>
          </ActiveLink>
        </article>
        <footer className="sm:w-full sm:px-5 sm:absolute sm:top-full flex xl:flex-col h-auto justify-center sm:-mt-32 sm:-mx-5 space-x-3 xl:space-x-0">
          <Button
            onClick={toggleModal}
            className="w-full mb-2 hidden xl:flex"
            color="primary"
            label="Create new task"
            icon={<Icon icon="plus" />}
          />
          <Button
            loading={logout}
            loadingMessage="Logging out..."
            onClick={() => {
              toggleLogout()
              destroyCookie(null, 'token')
              router.push('/login')
            }}
            className="w-full hidden xl:flex"
            color="primary"
            outlined
            label="Logout"
            icon={<Icon icon="logout" />}
          />
        </footer>
      </aside>
    </>
  )
}
