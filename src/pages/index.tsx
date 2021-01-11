import Head from 'next/head'

import useGQLQuery from '@hooks/useGQLQuery'
import useToggle from '@hooks/useToggle'

import { GET_USERS } from '@utils/queries'

const UserSkeleton: React.FC = () => {
  return (
    <>
      <div className="py-3 px-5 my-2 w-lg bg-indigo-50 border border-indigo-300 animate-pulse rounded dark:bg-indigo-800 dark:border-indigo-700">
        <div className="w-36 h-3 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700 mb-2"></div>
        <div className="w-48 h-5 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700 mb-2"></div>
        <div className="w-32 h-2 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700"></div>
      </div>
      <div className="py-3 px-5 my-2 w-lg bg-indigo-50 border border-indigo-300 animate-pulse rounded dark:bg-indigo-800 dark:border-indigo-700">
        <div className="w-36 h-3 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700 mb-2"></div>
        <div className="w-48 h-5 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700 mb-3"></div>
        <div className="w-32 h-2 bg-indigo-300 animate-pulse rounded dark:bg-indigo-700"></div>
      </div>
    </>
  )
}

const Home: React.FC = () => {
  const [darkMode, toggleDarkMode] = useToggle(false)
  const { data, isLoading } = useGQLQuery('users', GET_USERS)

  return (
    <div className={`subpixel-antialiased ${darkMode ? 'dark' : ''}`}>
      <Head>
        <title>Create Next App - Boilerplate</title>
      </Head>

      <main className="w-screen h-screen flex flex-col justify-center items-center bg-white transition-colors dark:bg-gray-900">
        <button
          onClick={toggleDarkMode}
          className="mt-4 text-xs bg-indigo-400 px-4 py-2 text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 dark:ring-offset-gray-900"
        >
          <p>
            {darkMode
              ? 'Click here to toggle light mode 🌞'
              : 'Click here to toggle dark mode 🌜'}
          </p>
        </button>

        <section className="w-64">
          {isLoading ? (
            <UserSkeleton />
          ) : data ? (
            <article>
              {data.users.map(user => (
                <div
                  className="py-3 px-5 my-2 w-lg bg-indigo-50 border border-indigo-300 rounded dark:bg-gray-800"
                  key={user._id}
                >
                  <p className="font-light text-sm text-indigo-500 text-opacity-75 dark:text-indigo-400">
                    {user.email}
                  </p>
                  <h2 className="font-bold text-xl text-indigo-500 dark:text-indigo-400">
                    {user.name}
                  </h2>
                  <span className="text-xs text-indigo-500 text-opacity-40 dark:text-indigo-400">
                    {user._id}
                  </span>
                </div>
              ))}
            </article>
          ) : (
            <code>No data found. 😪</code>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
