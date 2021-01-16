import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'

import useGQLClient from '@hooks/useGQLClient'

import Button from '@components/Button'
import Input from '@components/Input'

import { LOGIN } from '@utils/queries'

import { setCookie } from 'nookies'

export default function Login(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const client = useGQLClient()
  const router = useRouter()

  const handleLogin = async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await client.request(LOGIN, { email, password })

      setCookie(null, 'token', data.login.token, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // Expires after 7d
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
      })

      router.push('/dashboard')
    } catch (err) {
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="h-full py-24 px-20 shadow-lg rounded">
        <Image src="/logo.svg" width={40} height={40} />
        <h1 className="mt-6 text-gray-900 text-4xl font-bold tracking-tighter mb-2">
          Sign in to your account
        </h1>
        <span className="text-gray-500 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register">
            <a className="text-indigo-600 font-semibold transition-colors hover:text-indigo-500">
              Create one now!
            </a>
          </Link>
        </span>
        <form
          className="mt-16 flex flex-col max-w-lg"
          onSubmit={handleSubmit(handleLogin)}
        >
          <Input
            type="email"
            label="Email address"
            name="email"
            errors={errors}
            ref={register({ required: 'Email address field cannot be empty' })}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            errors={errors}
            ref={register({
              required: 'Password field cannot be empty'
            })}
          />

          <Button
            type="submit"
            className="mt-16 rounded w-full shadow"
            label="Sign in"
            color="primary"
            loading={loading}
            loadingMessage="Signing in"
          />
        </form>
      </section>
      <section className="h-full hidden md:block">
        <div className="relative w-full h-full">
          <Image
            src="/login-bg.jpg"
            quality={80}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </section>
    </main>
  )
}
