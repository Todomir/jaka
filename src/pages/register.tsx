import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FormEvent, ReactElement, useState } from 'react'

import useGQLClient from '@hooks/useGQLClient'

import Button from '@components/Button'
import Input from '@components/Input'

import { SIGN_UP } from '@utils/queries'

export default function Login(): ReactElement {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const client = useGQLClient()
  const router = useRouter()

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await client.request(SIGN_UP, { name, email, password })
      console.log(data)
      router.push('/login')
    } catch (err) {
      throw new Error(err.message)
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
      <section className="h-full py-24 px-20 shadow-lg rounded">
        <Image src="/logo.svg" width={40} height={40} />
        <h1 className="mt-6 text-gray-900 text-4xl font-bold tracking-tighter mb-2">
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
        <form className="mt-16 flex flex-col max-w-lg" onSubmit={handleLogin}>
          <Input
            value={name}
            onChange={e => {
              setName(e.target.value)
            }}
            label="Full name"
          />
          <Input
            value={email}
            onChange={e => {
              setEmail(e.target.value)
            }}
            label="Email address"
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
            label="Sign up"
            color="primary"
          />
        </form>
      </section>
    </main>
  )
}
