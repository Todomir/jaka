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
import { parseCookies } from 'nookies'

export default function Profile({
  user,
  token
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
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
        onSuccess: () => {
          router.push('/dashboard')
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
    <div className="flex justify-center items-center w-screen h-screen tracking-tight">
      <div className="bg-gray-100 rounded-lg px-10 pb-14 pt-10 w-7/12 shadow-lg border border-gray-300 dark:bg-gray-800 dark:border-gray-600">
        <header className="text-4xl font-bold tracking-tighter mb-12">
          <div className="flex justify-between items-center">
            My profile
            <Link href="/dashboard">
              <a className="flex text-base items-center font-semibold tracking-tight transition-colors duration-300 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
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

            <footer className="-mx-10 -mb-14 py-5 px-7 mt-12 flex justify-between space-x-5 bg-indigo-50 border-t border-gray-300 rounded-b-lg dark:bg-gray-700 dark:border-gray-600">
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
  const { token } = parseCookies(ctx, 'token')
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
      }

      return { props: { token, user: response.user } }
    }
  } catch (error) {
    console.log(error.message)

    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
    }
  }

  return {
    props: { token, user: {} }
  }
}
