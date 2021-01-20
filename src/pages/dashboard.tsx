import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  ReactNodeArray,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import NoSSR from 'react-no-ssr'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import useToggle from '@hooks/useToggle'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Modal from '@components/Modal'
import Sidebar from '@components/Sidebar'
import TaskList from '@components/TaskList'

import { GET_TASKS, UPDATE_TASKS, VALIDATE_TOKEN } from '@utils/queries'

import { AnimatePresence, motion } from 'framer-motion'
import { GraphQLClient } from 'graphql-request'
import produce from 'immer'
import ironStore from 'iron-store'
import { parseCookies } from 'nookies'

export interface ITask {
  _id: string
  title: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ITasks {
  todo: [ITask]
  doing: [ITask]
  done: [ITask]
}

interface ITaskContext {
  tasks: ITasks
  setTasks: Dispatch<SetStateAction<ITasks>>
  client: GraphQLClient
}
interface ITaskProvider extends ITaskContext {
  children: ReactNode | ReactNodeArray | ReactElement
}

export const TaskContext = createContext<ITaskContext>(null)

const TaskProvider = ({ tasks, setTasks, children, client }: ITaskProvider) => {
  return (
    <TaskContext.Provider value={{ tasks, setTasks, client }}>
      {children}
    </TaskContext.Provider>
  )
}

export default function Dashboard({
  session
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const { user, token } = session
  // GraphQL Client chunk
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  // React Query chunk
  const queryClient = useQueryClient()

  const { data } = useQuery('tasks', async () => {
    const data = await client.request(GET_TASKS)
    const [tasks] = data.tasks
    return tasks || { todo: [], doing: [], done: [] }
  })

  const { mutateAsync: updateTasks } = useMutation(async (tasks: ITasks) => {
    return await client.request(UPDATE_TASKS, { tasks })
  })

  const [tasks, setTasks] = useState<ITasks>(data)
  const [deletedId, setDeletedId] = useState<string>('')
  const [deletedIndex, setDeletedIndex] = useState<number>()
  const [modal, toggleModal] = useToggle()
  const [showTooltip, toggleTooltip] = useToggle()

  useEffect(() => {
    if (tasks) {
      ;(async () => {
        try {
          await updateTasks({
            todo: tasks.todo,
            doing: tasks.doing,
            done: tasks.done
          })
          queryClient.invalidateQueries('tasks')
        } catch (error) {
          throw new Error(error.message)
        } finally {
          queryClient.invalidateQueries('tasks')
        }
      })()
    }
  }, [tasks])

  const onDragEnd = useCallback(
    result => {
      toggleTooltip()
      if (result.reason === 'DROP') {
        const { source, destination } = result

        if (destination === undefined || destination === null) {
          setDeletedId(source.droppableId)
          setDeletedIndex(source.index)
          toggleModal()
        } else {
          const newTasks = produce(tasks, draft => {
            draft[source.droppableId] = draft[source.droppableId] || []
            draft[destination.droppableId] =
              draft[destination.droppableId] || []
            const [removed] = draft[source.droppableId].splice(source.index, 1)
            draft[destination.droppableId].splice(destination.index, 0, removed)
          })

          setTasks(newTasks)
        }
      }
    },
    [tasks]
  )

  return (
    <main className="w-screen h-screen">
      <AnimatePresence>
        {showTooltip && (
          <motion.span
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.3 }}
            className="fixed text-xs bottom-0 left-0 w-full flex justify-center items-center mb-16 sm:mb-10 z-50"
          >
            <div className="flex justify-center items-center py-2 px-4 bg-blue-500 text-white font-semibold tracking-tight rounded-md shadow-md w-2/3 sm:w-auto sm:text-sm">
              <Icon size={28} icon="info" />{' '}
              <p className="ml-3">
                You can drop a task outside a droppable column to delete it.
              </p>
            </div>
          </motion.span>
        )}
      </AnimatePresence>
      <TaskProvider client={client} tasks={tasks} setTasks={setTasks}>
        <Modal show={modal}>
          <header>
            <h1 className="text-3xl font-bold tracking-tight">Delete task</h1>
          </header>
          <main className="mt-4">
            <p className="text-gray-700 dark:text-gray-400">
              You&apos;re trying to delete a task. This action is permanent and
              irreversible. Are you sure you want to delete?
            </p>
          </main>
          <footer className="-m-7 py-5 px-7 mt-12 flex justify-between space-x-5 bg-gray-100 border-t border-gray-300 rounded-b-lg dark:bg-gray-700 dark:border-gray-500">
            <Button
              className="w-full"
              color="primary"
              label="No, go back."
              onClick={toggleModal}
              type="button"
            />
            <Button
              className="w-full"
              color="danger"
              label="Yes, delete the task."
              type="button"
              onClick={() => {
                const newTasks = produce(tasks, draft => {
                  draft[deletedId].splice(deletedIndex, 1)
                })
                setTasks(newTasks)
                toggleModal()
              }}
              outlined
            />
          </footer>
        </Modal>

        <NoSSR>
          <section className="grid grid-cols-dashboard sm:gap-5 w-full h-full">
            <Sidebar client={client} user={user} />
            <DragDropContext
              onDragStart={toggleTooltip}
              onDragEnd={result => onDragEnd(result)}
            >
              <TaskList tasks={tasks} />
            </DragDropContext>
          </section>
        </NoSSR>
      </TaskProvider>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { seal } = parseCookies(ctx)

  const store = await ironStore({
    password: process.env.NEXT_PUBLIC_STORE_PASSWORD,
    sealed: seal
  })

  const session = store.get('session')

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const queryClient = new QueryClient()
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
    headers: {
      authorization: `Bearer ${session.token}`
    }
  })

  try {
    const data = await client.request(VALIDATE_TOKEN, { token: session.token })
    const response = data.validateToken

    if (!response.user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    } else {
      await queryClient.prefetchQuery('tasks', async () => {
        const data = await client.request(GET_TASKS)
        return data.tasks[0] || { todo: [], doing: [], done: [] }
      })

      return {
        props: {
          session,
          dehydratedState: dehydrate(queryClient)
        }
      }
    }
  } catch (error) {
    console.log(error.message)

    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    }
  }

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient)
    }
  }
}
