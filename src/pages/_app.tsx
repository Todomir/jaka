import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactElement } from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Hydrate } from 'react-query/hydration'

import DarkModeProvider from '@store/DarkModeContext'

export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} />
        <DarkModeProvider>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </DarkModeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
