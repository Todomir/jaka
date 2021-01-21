import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'

import useToast from '@hooks/useToast'

import Button from '@components/Button'
import Icon from '@components/Icon'
import Input from '@components/Input'

export default function Login(): ReactElement {
  const [loading, setLoading] = useState<boolean>(false)
  const { addToast } = useToast()

  const { register, handleSubmit, errors } = useForm()
  const router = useRouter()

  const handleLogin = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })

      if (res.ok) {
        addToast({
          title: 'Success!',
          description:
            'Your login was successful. Redirecting to dashboard page',
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
    } catch (err) {
      addToast({
        title: 'Uh oh!',
        description: `There was an error: ${err}`,
        status: 'danger',
        duration: 3000
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 tracking-tight">
      <section className="h-full py-24 px-20 shadow-lg rounded">
        <Link href="/">
          <a className="flex items-center mb-12 -mt-7 font-semibold tracking-tight transition-colors duration-300 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
            <Icon size={18} icon="arrowLeft" />{' '}
            <span className="ml-3">Return to home page</span>
          </a>
        </Link>
        <Image alt="JAKA Logo" src="/logo.svg" width={40} height={40} />
        <h1 className="mt-6 text-gray-900 text-4xl font-bold tracking-tighter mb-2 dark:text-gray-100">
          Sign in to your account
        </h1>
        <span className="text-gray-500 text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/register">
            <a className="text-indigo-600 font-semibold transition-colors hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
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
            alt="Get shit done"
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
