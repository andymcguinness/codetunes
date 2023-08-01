import { GraphQLClient } from 'graphql-request'

export function request({ query, variables } : { query: any, variables: any}) {
  const endpoint = 'https://graphql.datocms.com/'

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  })
  return client.request(query, variables)
}