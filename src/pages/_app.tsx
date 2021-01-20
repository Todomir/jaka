import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

import DarkModeProvider from '@store/DarkModeContext'
import ToastProvider from '@store/ToastContext'
export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  const client = new QueryClient()

  return (
    <>
      <Head>
        <title>JAKA | Just Another Kanban App</title>
        <meta charSet="utf-8" />
        <meta name="description" content="Just Another Kanban App" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <QueryClientProvider client={client}>
        <Hydrate state={pageProps.dehydratedState}>
          <DarkModeProvider>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </DarkModeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
