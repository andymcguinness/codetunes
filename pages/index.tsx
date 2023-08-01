import { request } from "../lib/datocms";
import PlaylistSwitcher, { Playlists } from "./components/PlaylistSwitcher";

export async function getStaticProps({ preview = false }) {
  // Query
  const PLAYLIST_QUERY = `{
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

  // Request
  const playlists = (await request({
    "query": PLAYLIST_QUERY,
    "variables": { "limit": 10 }
  })) || [];

  // Return
  return {
    props: { playlists },
  }
}

function Home({ playlists }: { playlists: Playlists }) {

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-20 px-4 md:px-24 md:py-24">

    {
      // Handle playlists
    }
    <PlaylistSwitcher playlists={playlists} />

    </main>
  )
}

export default Home;