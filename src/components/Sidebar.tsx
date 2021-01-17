import { useRouter } from 'next/router'

import {
  Dispatch,
  FormEvent,
  ReactElement,
  useContext,
  useRef,
  useState
} from 'react'
import { useMutation, useQueryClient } from 'react-query'

import useToggle from '@hooks/useToggle'
import useWindowSize from '@hooks/useWindowSize'

import { DarkModeContext } from '@store/DarkModeContext'

import { CREATE_TASK } from '@utils/queries'

import { GraphQLClient } from 'graphql-request'
import { destroyCookie } from 'nookies'

import Button from './Button'
import Editable from './Editable'
import Icon from './Icon'
import ActiveLink from './Link'
import Modal from './Modal'
import Switch from './Switch'

interface SidebarProps {
  user: { _id?: string; name: string; email: string }
  dispatch: Dispatch<unknown>
  client: GraphQLClient
}

export default function Sidebar({
  user,
  client,
  dispatch
}: SidebarProps): ReactElement {
  const [logout, toggleLogout] = useToggle()
  const [showModal, toggleModal] = useToggle()

  const [title, setTitle] = useState<string>('Create a new task')
  const [description, setDescription] = useState<string>(
    'Click on the labels to edit its content.'
  )

  const { darkMode, toggleDarkMode } = useContext(DarkModeContext)
  const { width } = useWindowSize()

  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)

  const router = useRouter()

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(
    async (task: { title: string; description?: string }) => {
      return await client.request(CREATE_TASK, {
        title: task.title,
        description: task.description
      })
    }
  )

  const onCreateTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const { createTask: task } = await mutateAsync({
        title,
        description
      })
      dispatch({ type: 'ADD', task })
      queryClient.invalidateQueries('tasks')
    } catch (error) {
      throw new Error(error.message)
    } finally {
      queryClient.invalidateQueries('tasks')
      toggleModal()
    }
  }

  return (
    <>
      <Modal show={showModal} toggle={toggleModal}>
        <form className="flex flex-col" onSubmit={onCreateTask}>
          <Editable
            childRef={titleRef}
            className="font-bold text-2xl text-indigo-300 tracking-tighter"
            text={title}
            type="text"
          >
            <input
              className="px-2 py-1 mb-3 w-full font-bold text-2xl text-indigo-300 tracking-tighter rounded bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 dark:focus:ring-offset-gray-800"
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              ref={titleRef}
            />
          </Editable>
          <Editable
            childRef={descriptionRef}
            className="text-base text-gray-400 tracking-tighter"
            text={description}
            type="textarea"
          >
            <textarea
              className="px-2 py-1 mt-3 w-full text-base text-gray-400 tracking-tighter bg-transparent rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-offset-gray-800"
              rows={1}
              name="title"
              id="title"
              value={description}
              onChange={e => setDescription(e.target.value)}
              ref={descriptionRef}
            />
          </Editable>

          <footer className="-m-7 py-5 px-7 mt-12 flex justify-between space-x-5 bg-gray-100 border-t border-gray-300 rounded-b-lg dark:bg-gray-700 dark:border-gray-500">
            <Button
              loading={isLoading}
              loadingMessage="Saving task..."
              className="w-full"
              color="primary"
              icon={<Icon icon="plus" />}
              label="Save task"
              type="submit"
            />
            <Button
              className="w-full dark:bg-gray-700"
              color="primary"
              label="Cancel"
              outlined
              onClick={toggleModal}
              type="button"
            />
          </footer>
        </form>
      </Modal>
      <aside className="fixed bottom-0 w-full sm:row-start-1 sm:relative sm:col-start-1 justify-between sm:justify-start flex sm:flex-col h-12 sm:w-auto xl:w-72 sm:h-full px-2 md:px-5 py-2 sm:py-5 bg-gray-100 border border-indigo-50 rounded shadow-sm transition-colors duration-500 dark:bg-gray-800 dark:border-gray-700">
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
              <Icon icon="user" /> <p className="hidden md:block">Profile</p>
            </a>
          </ActiveLink>
        </article>
        <div className="fixed top-0 left-0 p-4 w-full grid grid-cols-2 gap-5 bg-gray-50 rounded-b-lg shadow sm:hidden dark:bg-gray-800">
          <Button
            onClick={toggleModal}
            className="w-full h-full flex rounded-lg"
            color="primary"
            label="New task"
            icon={<Icon size={width < 640 ? 15 : 24} icon="plus" />}
            small
          />
          <Button
            loading={logout}
            loadingMessage={width < 1280 ? '' : 'Signing out'}
            onClick={() => {
              toggleLogout()
              destroyCookie(null, 'token')
              router.push('/login')
            }}
            className="w-full h-full flex rounded-lg"
            color="primary"
            outlined
            label="Sign out"
            icon={<Icon size={width < 640 ? 15 : 24} icon="logout" />}
            small
          />
        </div>
        <footer className="sm:w-20 md:w-full xl:w-full sm:px-5 sm:absolute sm:bottom-0 flex sm:flex-col h-auto justify-center sm:mb-12 sm:-mx-5 space-x-3 sm:space-x-0 xl:space-x-0">
          <Button
            onClick={toggleModal}
            className="w-full h-full hidden rounded-lg mb-2 sm:flex"
            color="primary"
            label={width < 1280 ? '' : 'Create new task'}
            icon={<Icon size={width < 640 ? 15 : 24} icon="plus" />}
          />
          <Button
            loading={logout}
            loadingMessage={width < 1280 ? '' : 'Signing out'}
            onClick={() => {
              toggleLogout()
              destroyCookie(null, 'token')
              router.push('/login')
            }}
            className="w-full h-full hidden rounded-lg sm:flex"
            color="primary"
            outlined
            label={width < 1280 ? '' : 'Sign out'}
            icon={<Icon size={width < 640 ? 15 : 24} icon="logout" />}
          />
        </footer>
      </aside>
    </>
  )
}
