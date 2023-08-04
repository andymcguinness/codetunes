import { GraphQLClient } from 'graphql-request'
import { Playlists } from '../components/PlaylistSwitcher'

export function request({ query, variables } : { query: any, variables: any}) : Promise<Playlists> {
  const endpoint = 'https://graphql.datocms.com/'

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  
  const data : Promise<Playlists> = client.request(query, variables);

  return data;
}

export function playlistRequest({ query, variables } : { query: any, variables: any}) : Promise<any> {
  const endpoint = 'https://graphql.datocms.com/'

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
    },
  });
  
  const data : Promise<any> = client.request(query, variables);

  return data;
}