// Next.js
import Image from "next/image";

// Framer-motion
import { motion } from "framer-motion";

// React Icons
import { IconContext } from "react-icons";
import { ImShare } from "react-icons/im";
import Link from "next/link";

// Generating my types
export interface Playlists {
  "allPlaylists": [
    Playlist
  ]
}

export interface Playlist {
  "title": string;
  "genre": string;
  "songs": [
    Song
  ];
  "description": string;
  "coverImage": CoverImage;
}

export interface Song {
  "title": string;
  "artist": string;
  "attribution": string;
  "song": {
    "url": string;
  }
}

export interface CoverImage {
  "blurhash": string;
  "customData": {
    "unsplashUser": string;
    "unsplashUserUrl": string;
  };
  "url": string;
}

export default function PlaylistsComponent({ playlists }: { playlists: Playlists }) {
  return (
    <div>
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Playlists</h1>
      <div className="flex flex-rows relative w-full h-auto">

        {playlists.allPlaylists.map((value: Playlist, index: number) => {

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
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.9 }}
              key={index}
            >
              <Link href={`/playlist/${value.title}`}>
                <div className="text-xs text-white relative">
                  <Image
                    height={512}
                    width={512}
                    fill={false}
                    src={value.coverImage.url}
                    alt="Cover art for the playlist."
                  />
                  <div className="absolute right-0 left-0 bottom-0 flex items-end px-6 py-5 drop-shadow-large bg-gradient-to-t from-gray-700 items-center">
                    Photo by <a className="inline relative mr-1 ml-1" href={value.coverImage.customData.unsplashUserUrl} target="_blank">{value.coverImage.customData.unsplashUser}</a> on <a className="inline relative ml-1" href="https://unsplash.com/" target="_blank">Unsplash</a>.

                    <IconContext.Provider value={{ className: 'align-middle text-xs flex ml-1' }}>
                      <ImShare />
                    </IconContext.Provider>
                  </div>
                </div>
                <div className="px-6 py-4 relative">
                  <h1 className="font-bold text-xl mb-2">{value.title}</h1>
                  <p className="text-gray-700 text-base">
                    {value.description}
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2 relative">
                  <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{value.genre}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}