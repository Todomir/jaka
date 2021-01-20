import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

import useToast from '@hooks/useToast'
import useToggle from '@hooks/useToggle'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Input from '@components/Input'

import { UPDATE_USER, VALIDATE_TOKEN } from '@utils/queries'

import { GraphQLClient } from 'graphql-request'
import ironStore from 'iron-store'
import { parseCookies } from 'nookies'

export default function Profile({
  session
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const { user, token } = session
  const { register, handleSubmit, errors } = useForm({ defaultValues: user })
  const [loading, toggleLoading] = useToggle()
  const { addToast } = useToast()
  const router = useRouter()

  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  const mutation = useMutation(
    async (user: { name?: string; password?: string; id: string }) => {
      return await client.request(UPDATE_USER, { ...user })
    }
  )

  const onSubmit = ({ name, password }) => {
    toggleLoading()
    mutation.mutate(
      { name, password, id: user._id },
      {
        onSuccess: async () => {
          const res = await fetch('/api/logout')

          if (res.ok) {
            addToast({
              title: 'Data updated successfully',
              description: 'Your data was updated. Please sign back in.',
              status: 'success',
              duration: 3000
            })
            router.push('/dashboard')
          } else {
            addToast({
              title: 'Uh oh!',
              description: `There was an error (${res.status}): ${res.statusText}`,
              status: 'danger',
              duration: 3000
            })
          }
          toggleLoading()
        },
        onError: error => {
          addToast({
            title: 'Uh oh!',
            description: `There as an error: ${error}`,
            status: 'danger',
            duration: 5000
          })
          toggleLoading()
        }
      }
    )
  }

  return (
    <div className="flex px-5 justify-center items-center w-screen h-screen tracking-tight">
      <div className="bg-gray-100 rounded-lg px-10 pb-14 pt-10 w-full sm:w-7/12 shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
        <header className="text-4xl sm:text-4xl font-bold tracking-tighter mb-12">
          <div className="flex flex-col-reverse justify-start items-start sm:flex-row sm:justify-between sm:items-center">
            <h1 className="mt-5">My profile</h1>
            <Link href="/dashboard">
              <a className="flex items-center font-semibold tracking-tight transition-colors duration-300 text-xs sm:text-sm md:text-base text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
                <Icon size={18} icon="arrowLeft" />{' '}
                <span className="ml-3">Return to dashboard</span>
              </a>
            </Link>
          </div>
          <p className="font-normal tracking-normal mb-4 text-base">
            {user.email}
          </p>
        </header>
        <main>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input ref={register} errors={errors} label="Name" name="name" />
            <Input
              ref={register}
              errors={errors}
              type="password"
              label="New password"
              name="password"
            />

            <footer className="-mx-10 -mb-14 py-5 px-7 mt-12 flex flex-col sm:flex-row justify-between space-y-5 sm:space-y-0 sm:space-x-5 bg-indigo-50 border-t border-gray-300 rounded-b-lg dark:bg-gray-700 dark:border-gray-600">
              <Button
                loading={loading}
                loadingMessage="Updating information"
                className="w-full"
                color="primary"
                label="Save changes"
                type="submit"
              />
              <Button
                className="w-full dark:bg-gray-700"
                color="primary"
                label="Return to dashboard"
                type="button"
                onClick={() => {
                  router.push('/dashboard')
                }}
                outlined
              />
            </footer>
          </form>
        </main>
      </div>
    </div>
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
      return {
        props: {
          session
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
}
