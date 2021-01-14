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
  const { data, isLoading } = useGQLQuery('tasks', GET_TASKS, {}, {}, token)

  return (
    <main>
      <section className="flex justify-center items-center w-screen h-screen">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="grid grid-cols-3 gap-5 items-start">
            <div
              id="to-do"
              className="px-4 py-3 border bg-gray-50 border-gray-200 rounded-lg space-y-2"
            >
              <h1 className="-mt-8 font-black tracking-tighter text-3xl text-indigo-300">
                TO-DO
              </h1>
              {data?.tasks
                .filter(task => task.status === 'to-do')
                .map(item => (
                  <div
                    className="px-6 py-3 bg-white shadow-sm max-w-md border border-gray-200 rounded-md tracking-tight"
                    key={item._id}
                  >
                    <h1 className="font-bold text-xl text-indigo-500">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
            </div>

            <div
              id="doing"
              className="px-4 py-3 border bg-gray-50 border-gray-200 rounded-lg space-y-2"
            >
              <h1 className="-mt-8 font-black tracking-tighter text-3xl text-blue-300">
                DOING
              </h1>
              {data?.tasks
                .filter(task => task.status === 'doing')
                .map(item => (
                  <div
                    className="px-6 py-3 bg-white shadow-sm max-w-md border border-gray-200 rounded-md tracking-tight"
                    key={item._id}
                  >
                    <h1 className="font-bold text-xl text-blue-500">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
            </div>

            <div
              id="done"
              className="px-4 py-3 border bg-gray-50 border-gray-200 rounded-lg space-y-2"
            >
              <h1 className="-mt-8 font-black tracking-tighter text-3xl text-green-300">
                DONE
              </h1>
              {data?.tasks
                .filter(task => task.status === 'done')
                .map(item => (
                  <div
                    className="px-6 py-3 bg-white shadow-sm max-w-md border border-gray-200 rounded-md tracking-tight"
                    key={item._id}
                  >
                    <h1 className="font-bold text-xl text-green-500">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
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
