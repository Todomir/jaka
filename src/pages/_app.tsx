import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const client = new QueryClient()
  return (
    <QueryClientProvider client={client}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default MyApp
