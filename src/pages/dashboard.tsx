import { GetServerSideProps } from 'next'

import { ReactElement, useCallback, useEffect, useReducer } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import NoSSR from 'react-no-ssr'
import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import TaskList from '@components/TaskList'

import { parseCookies } from '@utils/parseCookies'
import { GET_TASKS, UPDATE_TASKS, VALIDATE_TOKEN } from '@utils/queries'

import { GraphQLClient } from 'graphql-request'
import produce from 'immer'

interface DashboardProps {
  token: string
}

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

const dragReducer = produce((draft, action) => {
  switch (action.type) {
    case 'MOVE': {
      draft[action.from] = draft[action.from] || []
      draft[action.to] = draft[action.to] || []
      const [removed] = draft[action.from].splice(action.fromIndex, 1)
      draft[action.to].splice(action.toIndex, 0, removed)
    }
  }
})

export default function Dashboard({ token }: DashboardProps): ReactElement {
  const headers = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }

  const queryClient = useQueryClient()
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, headers)

  const { data } = useQuery('tasks', async () => {
    return await client.request(GET_TASKS)
  })

  const updateTasks = async (data: ITasks) => {
    const newTaskArr = { ...data }

    const tasks = {
      todo: newTaskArr.todo,
      doing: newTaskArr.doing,
      done: newTaskArr.done
    }

    return await client.request(UPDATE_TASKS, { tasks })
  }

  const [tasks, dispatch] = useReducer(dragReducer, data.tasks[0])

  useEffect(() => {
    updateTasks(tasks).then(() => {
      queryClient.invalidateQueries('tasks')
    })
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
        <section className="flex h-full justify-center items-center">
          <DragDropContext onDragEnd={result => onDragEnd(result)}>
            <TaskList tasks={tasks} />
          </DragDropContext>
        </section>
      </NoSSR>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const { token } = parseCookies(req)
  const queryClient = new QueryClient()
  const headers = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, headers)

  try {
    const data = await client.request(VALIDATE_TOKEN, { token })
    const auth = data.validateToken

    if (res) {
      if (!auth) {
        res.writeHead(302, { Location: '/login' })
        res.end()
      } else {
        await queryClient.prefetchQuery(
          'tasks',
          async () => await client.request(GET_TASKS)
        )
      }
    }
  } catch (error) {
    console.log(error.message)
    if (res) {
      res.writeHead(302, { Location: '/login' })
      res.end()
    }
  }

  return {
    props: { token, dehydratedState: dehydrate(queryClient) }
  }
}
