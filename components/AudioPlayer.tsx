import React, { ReactElement, useEffect, useRef, useState } from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf'
import { ImLoop, ImVolumeMedium } from 'react-icons/im'
import { FaBackward, FaForward, FaPause, FaPlay, FaStop, FaVolumeMute } from 'react-icons/fa'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'

import TimeItem from './TimeItem'
import { Song } from './PlaylistSwitcher'
import styles from '../styles/AudioPlayer.module.css'

export default function AudioPlayer({ song, playSong, nextSong }: { song: Song, playSong: Function, nextSong: Song }): ReactElement {
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loop, setLoop] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(1.0);
  const [seek, setSeek] = useState<number>(0.0);
  const [rate, setRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [duration, setDuration] = useState<number>(0);
  const [_raf, set_raf] = useState<number>(0);
  const player = useRef<ReactHowler>();

  function handleToggle() {
    if (playing) {
      player.current?.howler.pause();
    } else {
      player.current?.howler.play();
    }
  }

  function handleOnPause() {
    setPlaying(false);
  }

  function handleOnLoad() {
    setLoaded(true);
    setDuration(player.current?.duration() || 0.0);
  }

  function handleOnPlay() {
    setPlaying(true);
  }

  function handleOnEnd() {
    setPlaying(false);
    clearRAF();
    playSong(nextSong);
    setPlaying(true);
  }

  function handleStop() {
    player.current?.stop();
    setPlaying(false);
  }

  function handleLoopToggle() {
    setLoop(!loop);
  }

  function handleMuteToggle() {
    setMute(!mute);
  }

  function handleMouseDownSeek() {
    setIsSeeking(true);
  }

  function handleMouseUpSeek(e: any) {
    setIsSeeking(false);
    player.current?.howler.seek(e.target.value);
  }

  function handleSeekingChange(e: any) {
    setSeek(parseFloat(e.target.value));
  }

  function renderSeekPos() {

    if (!isSeeking) {
      setSeek(player.current?.seek() || 0);

      if (playing) {
        set_raf(raf(renderSeekPos))
      }
    }
  }

  function clearRAF() {
    raf.cancel(_raf);
  }

  function nextTrack() {
    playSong(nextSong);
  }

  useEffect(() => {
    // Get around weird state timing
    renderSeekPos();
  }, [playing, isSeeking])

  return (
    <div className='flex relative'>
      <ReactHowler
        src={song?.song.url}
        playing={playing}
        onPause={handleOnPause}
        onLoad={handleOnLoad}
        onPlay={handleOnPlay}
        onEnd={handleOnEnd}
        loop={loop}
        mute={mute}
        volume={volume}
        ref={(ref: ReactHowler) => { player.current = ref }}
      />
      <div className="w-full">
        <div className=" px-4 pt-4">
          <div id="time-container">
            <TimeItem
              time={seek.toFixed(2)}
            />
            <TimeItem
              time={(duration) ? duration.toFixed(2) : 'NaN'}
            />
          </div>
        </div>
        <div className="w-full">
          <input
            className={styles.inputRange}
            type='range'
            min='0'
            max={duration ? duration.toFixed(2) : 0}
            step='.01'
            value={seek}
            onInput={handleMouseUpSeek}
            onChange={handleSeekingChange}
            onMouseDown={handleMouseDownSeek}
            onMouseUp={handleMouseUpSeek}
          />
        </div>
        <div className="px-4 pt-5 pb-5">
          <div className="w-full flex flex-row gap-2 justify-center items-center">
            <label htmlFor={'loop'} className="flex items-center cursor-pointer">
              <div className="relative mr-2">
                  <input type="checkbox" id="loop" className="peer sr-only" checked={false} onChange={handleLoopToggle} />
                  <ImLoop className={`${loop ? 'text-blue-400' : 'text-gray-900'}`} />
              </div>
            </label>
            <button
              onClick={handleStop}
              className="w-10 h-10 rounded-full bg-blue-400 focus:outline-none items-center justify-center flex"
            >
              <FaBackward className={`${playing ? 'align-middle inline-flex text-white' : 'align-middle inline-flex text-white'}`} />
            </button>
            <button
              onClick={handleToggle}
              className="w-10 h-10 rounded-full bg-blue-400 focus:outline-none items-center justify-center flex"
            >
              <FaPause className={`${playing ? 'align-middle inline-flex text-white visible' : 'hidden'}`} />
              <FaPlay className={`${playing ? 'hidden' : 'visible align-middle inline-flex text-white'}`} />
            </button>
            <button
              onClick={nextTrack}
              className="w-10 h-10 rounded-full bg-blue-400 focus:outline-none items-center justify-center flex"
            >
              <FaForward className={`${playing ? 'align-middle inline-flex text-white' : 'align-middle inline-flex text-white'}`} />
            </button>
            <div className="relative ml-2">
                <Popover className="relative">
                  <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                    <ImVolumeMedium className={`${mute ? 'hidden' : 'text-gray-900'}`} />
                    <FaVolumeMute className={`${mute ? 'text-blue-400' : 'hidden'}`} />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-x-1"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-1"
                  >
                    <Popover.Panel className="absolute -top-3 left-6 z-10 flex w-auto items-center">
                      <div className="flex bg-gray-200 px-3 py-4 shadow-lg ring-1 ring-gray-900/5">
                      <input
                        className={styles.volumeRange}
                        type='range'
                        min='0'
                        max='1'
                        step='.05'
                        value={volume}
                        onChange={e => setVolume(parseFloat(e.target.value))}
                      />
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}