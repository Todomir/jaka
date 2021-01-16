import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
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
        <DarkModeProvider>
          <Component {...pageProps} />
        </DarkModeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
