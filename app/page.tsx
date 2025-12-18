import type { Metadata } from 'next'
import '../styles/globals.css'
import PlaylistSwitcher from '../components/PlaylistSwitcher';
import { executeQuery } from '@datocms/cda-client';
 
export const metadata: Metadata = {
  title: 'CodeTunes',
}
 
export default async function Page() {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/playlists` : 'http://localhost:3000/api/playlists';
  const playlistData = await fetch(url);
  const playlists = await playlistData.json();

  return (
    <main className="flex min-h-screen flex-col items-center gap-20 py-20 px-4 md:px-24 md:py-24">
      <PlaylistSwitcher playlists={playlists.data} />
    </main>
  )
}