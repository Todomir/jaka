import Head from 'next/head'
import Image from 'next/image'

import { ReactElement, useContext } from 'react'

import Button from '@components/Button'
import Nav from '@components/Nav'

import { DarkModeContext } from '@store/DarkModeContext'

export default function Home(): ReactElement {
  const { darkMode } = useContext(DarkModeContext)
  return (
    <div className={`subpixel-antialiased h-screen ${darkMode ? 'dark' : ''}`}>
      <header>
        <Head>
          <title>JAKA | Welcome</title>
        </Head>

        <Nav />
      </header>
      <main className="flex flex-col justify-center px-2 h-full w-screen dark:bg-gray-900">
        <section className="grid grid-cols-1 grid-rows-hero sm:grid-cols-hero mx-auto mt-24">
          <div
            id="hero"
            className="sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:mx-auto -mt-24 sm:mt-0 sm:self-end grid grid-cols-1 grid-rows-hero-elements sm:grid-cols-1 z-10"
          >
            <h1 className="flex items-center justify-center text-8xl sm:text-9xl lg:text-10xl font-cursive tracking-tightest bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              JAKA
            </h1>
            <div className="mx-auto sm:mx-0">
              <h2 className="inline-flex justify-center px-3 py-2 -mt-3 lg:-mt-6 font-sans text-sm sm:text-xl md:text-2xl lg:text-4xl tracking-tighter font-semibold text-white bg-black">
                Just Another Kanban App
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 px-16 sm:px-0 mt-16 sm:mt-6">
              <Button
                className="text-xs sm:text-base"
                label="Login"
                color="primary"
              />
              <Button
                className="text-xs sm:text-base"
                label="Register"
                color="primary"
                outlined
              />
            </div>
          </div>
          <div className="sm:col-start-2 sm:col-end-4 row-start-1 z-0">
            <div className="hidden sm:block">
              <Image
                src="/076.png"
                alt="Man checking a checkbox"
                layout="intrinsic"
                width={345}
                height={433}
              />
            </div>
            <div className="block mt-7 sm:hidden">
              <Image
                src="/076.png"
                alt="Man checking a checkbox"
                layout="intrinsic"
                width={210}
                height={255}
              />
            </div>
          </div>
        </section>
        <article className="w-48 md:w-96 text-center text-xs md:text-base mt-16 mb-10 tracking-tighter mx-auto text-gray-400 dark:text-gray-700">
          <strong className="font-semibold">JAKA</strong> is another Kanban app
          with a bit of a modern visual. It is running on the powerful framework{' '}
          <strong className="font-semibold">Next.js</strong> and deployed to{' '}
          <strong className="font-semibold">▲Vercel.</strong>
        </article>
      </main>
    </div>
  )
}
