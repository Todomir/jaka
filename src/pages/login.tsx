import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FormEvent, ReactElement, useState } from 'react'

import useGQLClient from '@hooks/useGQLClient'

import Button from '@components/Button'
import Input from '@components/Input'

import { LOGIN } from '@utils/queries'

export default function Login(): ReactElement {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const client = useGQLClient()
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await client.request(LOGIN, { email, password })
      console.log(data)
      router.push('/dashboard')
    } catch (err) {
      throw new Error(err.message)
    }
  }

  return (
    <main className="w-screen h-screen grid grid-cols-2">
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
        <form className="mt-16 flex flex-col max-w-lg" onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
            label="Email adress"
          />
          <Input
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
            type="password"
            label="Password"
          />

          <Button
            type="submit"
            className="mt-16 rounded w-full shadow"
            label="Sign in"
            color="primary"
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
