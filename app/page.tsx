import type { Metadata } from 'next'
import '../styles/globals.css'
import PlaylistSwitcher from '../components/PlaylistSwitcher';
import { executeQuery } from '@datocms/cda-client';
 
export const metadata: Metadata = {
  title: 'CodeTunes',
}

async function getPlaylists() {
  const query =  `{
    allPlaylists {
      coverImage {
        blurhash
        customData
        url
      }
      songs {
        artist
        attribution
        song {
          url
        }
        title
      }
      description
      genre
      title
    }
  }`;

  const data : any = await executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: {
      limit: 10
    }
  });

  return data;
}
 
export default async function Page() {
  const playlists = await getPlaylists();

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-20 px-4 md:px-24 md:py-24">
      <PlaylistSwitcher playlists={playlists} />
    </main>
  )
}