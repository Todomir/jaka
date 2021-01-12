import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'

import DarkModeProvider from '@store/DarkModeContext'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient()

  return (
    <QueryClientProvider client={client}>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </QueryClientProvider>
  )
}

export default MyApp
