import { executeQuery } from "@datocms/cda-client";
import PlaylistWrapper from "../../../components/PlaylistWrapper";

async function getPlaylistSongs(title: any) {

  const query = `query MyQuery {
    playlist(filter: {title: {eq: "${title}"}}) {
      title
      coverImage {
        blurhash
        customData
        url
      }
      description
      genre
      songs {
        artist
        attribution
        title
        song {
          url
        }
      }
    }
  }`;

  const data: any = await executeQuery(query, {
    token: `${process.env.DATOCMS_API_KEY}`,
    variables: {
      limit: 10
    }
  });

  return data;
}

export default async function PlaylistComponent({
  params,
} : {
  params: Promise<{ title: string }>
}) {
  const { title } = await params;

  const playlistData = await getPlaylistSongs(title);

  return (
    <>
      <PlaylistWrapper playlist={playlistData.playlist} />
    </>
  )
}