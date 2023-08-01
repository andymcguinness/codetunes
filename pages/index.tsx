import { request } from "../lib/datocms";
import { useState } from "react"
import AudioPlayer from "./components/AudioPlayer";


const HOMEPAGE_QUERY = `query {
  allSongs {
		song {
      title
      url
      customData
    }
	}
}`;


export async function getStaticProps() {
  const data = await request({
    "query": HOMEPAGE_QUERY,
    "variables": { "limit": 10 }
  });

  return {
    props: { 
      data,
    }
  };
}
function Home({ data }: { data: { allSongs: Array<T> } }) {
  const [currSong, setCurrSong] = useState(data.allSongs[0].song);

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-20 px-4 md:px-24 md:py-24">
      { currSong &&
        <AudioPlayer
          title={currSong ? currSong.title : "Still loading..."}
          artist={currSong ? currSong.customData.Artist : "loading..."}
          src={currSong ? currSong.url : null}
        />
      }
    </main>
  )
}

export default Home;