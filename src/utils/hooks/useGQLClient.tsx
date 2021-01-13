import { GraphQLClient } from 'graphql-request'

export default function useGQLClient(
  token = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): GraphQLClient {
  const headers = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  return new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, headers)
}
