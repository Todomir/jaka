import '../styles/globals.css'
import type { AppProps } from 'next/app'

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
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <DarkModeProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </DarkModeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
