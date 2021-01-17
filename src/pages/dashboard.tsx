import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

import { ReactElement, useCallback, useEffect, useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import NoSSR from 'react-no-ssr'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import Sidebar from '@components/Sidebar'
import TaskList from '@components/TaskList'

import { GET_TASKS, UPDATE_TASKS, VALIDATE_TOKEN } from '@utils/queries'

import { GraphQLClient } from 'graphql-request'
import produce from 'immer'
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

// Tasks reducer
const tasksReducer = produce((draft, action) => {
  switch (action.type) {
    case 'MOVE': {
      draft[action.from] = draft[action.from] || []
      draft[action.to] = draft[action.to] || []
      const [removed] = draft[action.from].splice(action.fromIndex, 1)
      draft[action.to].splice(action.toIndex, 0, removed)
      break
    }
    case 'ADD': {
      draft.todo.push(action.task)
      break
    }
    case 'FETCH_SUCCESS': {
      draft = action.payload
      break
    }

    default:
      return draft
  }
})

export default function Dashboard({
  token,
  user
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
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
    return data.tasks[0] || { todo: [], doing: [], done: [] }
  })

  const { mutateAsync: updateTasks } = useMutation(async (tasks: ITasks) => {
    return await client.request(UPDATE_TASKS, { tasks })
  })

  const [tasks, dispatch] = useReducer(tasksReducer, data)

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

  const onDragEnd = useCallback(result => {
    if (result.reason === 'DROP') {
      if (!result.destination) {
        return
      }
      dispatch({
        type: 'MOVE',
        from: result.source.droppableId,
        to: result.destination.droppableId,
        fromIndex: result.source.index,
        toIndex: result.destination.index
      })
    }
  }, [])

  return (
    <main className="w-screen h-screen">
      <NoSSR>
        <section className="grid grid-cols-dashboard sm:gap-5 w-full h-full">
          <Sidebar client={client} dispatch={dispatch} user={user} />
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            <TaskList tasks={tasks} />
          </DragDropContext>
        </section>
      </NoSSR>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { token } = parseCookies(ctx, 'token')
  const queryClient = new QueryClient()
  const headers = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, headers)

  try {
    const data = await client.request(VALIDATE_TOKEN, { token })
    const response = data.validateToken

    if (ctx.res) {
      if (!response.user) {
        ctx.res.writeHead(302, { Location: '/login' })
        ctx.res.end()
      } else {
        await queryClient.prefetchQuery('tasks', async () => {
          const data = await client.request(GET_TASKS)
          return data.tasks[0] || { todo: [], doing: [], done: [] }
        })

        return {
          props: {
            token,
            user: response.user,
            dehydratedState: dehydrate(queryClient)
          }
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
    props: { token, user: {}, dehydratedState: dehydrate(queryClient) }
  }
}
