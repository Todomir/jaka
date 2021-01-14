import { GetServerSideProps } from 'next'

import { ReactElement } from 'react'

import useGQLQuery from '@hooks/useGQLQuery'

import { parseCookies } from '@utils/parseCookies'
import { GET_TASKS, VALIDATE_TOKEN } from '@utils/queries'

import { GraphQLClient } from 'graphql-request'

interface DashboardProps {
  token: string
}

export default function Dashboard({ token }: DashboardProps): ReactElement {
  const {
    data: { tasks },
    error
  } = useGQLQuery('tasks', GET_TASKS, {}, {}, token)

  return (
    <main>
      <aside></aside>
      <section>
        {tasks.length > 0 ? (
          <div className="p-3">
            {tasks.map(task => (
              <div
                className="p-3 mb-2 max-w-md rounded-md bg-indigo-50 border border-indigo-200 tracking-tight text-indigo-900 shadow-sm"
                key={task._id}
              >
                <h1 className="font-bold text-xl">{task.title}</h1>
                <p className="text-sm text-indigo-700">{task.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks created yet.</p>
        )}
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, req }) => {
  const { token } = parseCookies(req)
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL)

  try {
    const data = await client.request(VALIDATE_TOKEN, { token })
    const auth = data.validateToken

    if (res) {
      if (!auth) {
        res.writeHead(302, { Location: '/login' })
        res.end()
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
    props: { token }
  }
}
