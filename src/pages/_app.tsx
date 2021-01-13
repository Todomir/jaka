import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import DarkModeProvider from '@store/DarkModeContext'

export default function MyApp({
  Component,
  pageProps
}: AppProps): ReactElement {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </QueryClientProvider>
  )
}
