import { QueryObserverResult, useQuery } from 'react-query'

import { DocumentNode } from 'graphql'
import { GraphQLClient } from 'graphql-request'

export default function useGQLQuery(
  key: string,
  query: DocumentNode,
  variables = {},
  config = {},
  token = ''
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): QueryObserverResult<any, unknown> {
  const headers = {
    headers: {
      authorization: `Bearer ${token}`
    }
  }
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL, headers)
  const fetch = async () => await client.request(query, variables)

  return useQuery(key, fetch, config)
}
