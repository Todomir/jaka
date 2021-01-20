import Link from 'next/link'

import { ReactElement } from 'react'

import Icon from '@components/Icon'

export default function ConfirmEmail(): ReactElement {
  return (
    <div className="w-screen h-screen p-5 flex justify-center items-center leading-6 text-gray-900 dark:text-gray-200">
      <main className="bg-gray-100 border border-gray-300 shadow-lg px-10 py-12 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter mb-7 dark:text-indigo-400">
          Thank you for registering!
        </h1>
        <p className="text-sm sm:text-base mb-2 w-full sm:w-9/12">
          There is just one more step left. We&apos;ve sent an email to you.
          Confirm your email to get acess to the application.
        </p>
        <p className="text-sm sm:text-base">
          If you don&apos;t find it, try searching the spam inbox.
        </p>

        <Link href="/">
          <a className="flex mt-10 items-center font-semibold tracking-tight transition-colors duration-300 text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-400">
            <Icon size={18} icon="arrowLeft" />{' '}
            <span className="ml-3">Return to home page</span>
          </a>
        </Link>
      </main>
    </div>
  )
}
