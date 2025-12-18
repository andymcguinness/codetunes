import { executeQuery } from "@datocms/cda-client";
import { Playlists } from '../components/PlaylistSwitcher'

export function request({ query, variables } : { query: any, variables: any}) : Promise<Playlists> {
  const data : Promise<Playlists> = executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: variables
  });

  return data;
}

export function playlistRequest({ query, variables } : { query: any, variables: any}) : Promise<any> {
  const data : Promise<any> = executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: variables
  });

  return data;
}