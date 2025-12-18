'use client';

import { useState } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { Playlist, Song } from "./PlaylistSwitcher";
import AudioPlayer from "./AudioPlayer";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function PlaylistWrapper(playlist: any) {
  console.log(playlist);

  const [currSong, setCurrSong] = useState<Song>(playlist?.playlist?.songs[0]);

  function playSong(song: Song) {
    setCurrSong(song);
  }

  return (
    <div className="grid grid-col-1 relative w-full h-auto justify-center">
      <Link href="/" className="flex w-full text-gray-700 text-base py-4 items-center hover:text-blue-400">
        <FaArrowLeft className="mr-2" />
        Back to Playlists
      </Link>
      <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">{playlist?.title}</h1>
      <motion.div
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
      >
        <div className="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden mt-4 mb-4">
          <div className="relative">
            <Image
              src={playlist?.playlist?.coverImage.url}
              height={200}
              alt={"A title"}
              width={800}
            />
            <div className="absolute p-4 inset-0 flex flex-col justify-end bg-gradient-to-b from-transparent to-gray-900 backdrop backdrop-blur-5 text-white">
              <h3 className="font-bold">{currSong?.title}</h3>
              <span className="opacity-70">{currSong?.artist}</span>
            </div>
          </div>
          <AudioPlayer song={currSong} playSong={playSong} nextSong={playlist?.playlist.songs.length > 1 ? playlist?.playlist.songs[playlist?.playlist.songs.indexOf(currSong) + 1] : currSong} />

          <ul className="text-xs sm:text-base divide-y border-t cursor-default">

            {playlist?.playlist.songs.map((value: Song, index: number) => {

              if (value != currSong) {
                return (
                  <motion.div
                    className="overflow-hidden relative hover:cursor-pointer"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {
                        opacity: 0
                      },
                      visible: {
                        opacity: 1,
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
                    <li className="flex items-center space-x-3 hover:bg-gray-100 group">
                      <button className="px-5 py-5 h-full hover:bg-blue-400 group focus:outline-none" onClick={() => { playSong(value) }}>
                        <FaPlay className="w-4 h-4 group-hover:text-black hover:text-white" />
                      </button>
                      <div className="flex-1 flex-rows px-1 py-1 group-hover:text-black">
                        <span className="flex font-semibold">{value.title}</span>
                        <span className="flex text-base">{value.artist}</span>
                      </div>
                    </li>
                  </motion.div>
                )
              }
            })}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}