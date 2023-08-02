import { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { request, playlistRequest } from "../../lib/datocms";

import { Playlist, Song } from "../components/PlaylistSwitcher";
import AudioPlayer from "../components/AudioPlayer";

export async function getStaticPaths() {
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
  const playlists = await request({
    "query": PLAYLIST_QUERY,
    "variables": { "limit": 10 }
  });

  const paths = playlists.allPlaylists.map((playlist : Playlist) => ({
    params: { title: playlist.title },
  }))
    return {
      paths,
      fallback: true
    }
  }

export async function getStaticProps({ params } : { params: any }) {
        // Query
    const PLAYLIST_QUERY = `query MyQuery {
    playlist(filter: {title: {eq: "${params.title}"}}) {
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
    }`

    // Request
    const playlistResult = await playlistRequest({
        "query": PLAYLIST_QUERY,
        "variables": { "limit": 10 }
    });

    const playlist = playlistResult.playlist;

    // Return
    return {
        props: { playlist },
    }
  }

export default function PlaylistComponent({ playlist }: { playlist: Playlist }) {

    const [currSong, setCurrSong] = useState<Song>(playlist.songs[0]);

    function playSong(song : Song) {
        setCurrSong(song);
    }

    return (
        <div className="flex flex-rows relative w-full h-auto justify-center">
            <div className="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden mt-4">
                <div className="relative">
                    <Image
                        src={playlist.coverImage.url}
                        height={200}
                        alt={"A title"}
                        width={800}
                    />
                    <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
                        <h3 className="font-bold">{currSong.title}</h3>
                        <span className="opacity-70">{currSong.artist}</span>
                    </div>
                </div>
                <AudioPlayer song={currSong} />

                <ul className="text-xs sm:text-base divide-y border-t cursor-default">

                    {playlist.songs.map((value: Song, index: number) => {
                        
                        if (value != currSong) {
                            return (
                                <motion.div
                                    className="max-w-sm overflow-hidden shadow-lg relative mr-4 [&>*:nth-child(2n)]:mr-0 hover:cursor-pointer"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        hidden: {
                                            opacity: 0,
                                            y: 100
                                        },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: .4
                                            }
                                        },
                                    }}
                                    whileHover={{
                                        opacity: 0.8,
                                        transition: { duration: 0.4 },
                                    }}
                                    whileTap={{ opacity: 0.8 }}
                                    key={index}
                                >
                                    <li className="flex items-center space-x-3 hover:bg-gray-100">
                                        <button className="p-3 hover:bg-green-500 group focus:outline-none" onClick={() => { playSong(value) }}>
                                            <svg className="w-4 h-4 group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                                        </button>
                                        <div className="flex-1">
                                            {value.artist} | {value.title}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            2:58
                                        </div>
                                    </li>
                                </motion.div>
                            )
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}