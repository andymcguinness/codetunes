import { executeQuery } from "@datocms/cda-client";
import PlaylistWrapper from "../../../components/PlaylistWrapper";

export default async function PlaylistComponent({
  params,
} : {
  params: Promise<{ title: string }>
}) {
  const { title } = await params;
  const url = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/songs` : 'http://localhost:3000/api/songs';
  const playlistData = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ title })
  });

  const playlist = await playlistData.json();

  return (
    <>
      <PlaylistWrapper playlist={playlist.data.playlist} />
    </>
  )
}