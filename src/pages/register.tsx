import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'

import useGQLClient from '@hooks/useGQLClient'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Input from '@components/Input'

import { SIGN_UP } from '@utils/queries'

export default function Login(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm()

  const client = useGQLClient()
  const router = useRouter()

  const handleRegister = async ({ name, email, password }) => {
    setLoading(true)
    try {
      await client.request(SIGN_UP, {
        name,
        email,
        password
      })
      router.push('/login')
    } catch (err) {
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="h-full hidden md:block">
        <div className="relative w-full h-full">
          <Image
            src="/register-bg.jpg"
            quality={80}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </section>
      <section className="h-full py-24 px-20 shadow-lg rounded tracking-tight">
        <Link href="/">
          <a className="flex items-center mb-12 -mt-7 font-semibold tracking-tight transition-colors duration-300 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
            <Icon size={18} icon="arrowLeft" />{' '}
            <span className="ml-3">Return to home page</span>
          </a>
        </Link>
        <Image src="/logo.svg" width={40} height={40} />
        <h1 className="mt-6 text-gray-900 text-4xl font-bold tracking-tighter mb-2 dark:text-gray-100">
          Sign up to <span className="font-cursive">JAKA</span>
        </h1>
        <span className="text-gray-500 text-sm">
          Already have an account?{' '}
          <Link href="/login">
            <a className="text-indigo-600 font-semibold transition-colors hover:text-indigo-500">
              Login now!
            </a>
          </Link>
        </span>
        <form
          className="mt-16 flex flex-col max-w-lg"
          onSubmit={handleSubmit(handleRegister)}
        >
          <Input
            label="Full name"
            name="name"
            errors={errors}
            ref={register({
              required: 'Name field cannot be empty',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters long'
              }
            })}
          />
          <Input
            type="email"
            label="Email address"
            name="email"
            errors={errors}
            ref={register({
              required: 'Email address field cannot be empty'
            })}
          />
          <Input
            type="password"
            label="Password"
            name="password"
            errors={errors}
            ref={register({
              required: 'Password field cannot be empty',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long'
              }
            })}
          />

          <Button
            type="submit"
            className="mt-16 rounded w-full shadow"
            label="Sign up"
            color="primary"
            loading={loading}
            loadingMessage="Creating new user"
          />
        </form>
      </section>
    </main>
  )
}
