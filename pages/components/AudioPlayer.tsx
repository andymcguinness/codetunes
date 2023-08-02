import React, {ReactElement, useEffect, useRef, useState} from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf'
import { ImVolumeMedium } from 'react-icons/im'
import { FaPlay, FaStop } from 'react-icons/fa'
import Switch from './Switch'
import TimeItem from './TimeItem'
import { Song } from './PlaylistSwitcher'

export default function AudioPlayer({song} : { song: Song}) : ReactElement {
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
        setPlaying(!playing);
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

    function handleMouseUpSeek(e : any) {
        setIsSeeking(false);
        player.current?.seek(e.target.value);
    }

    function handleSeekingChange(e : any) {
        setSeek(parseFloat(e.target.value));
    }

    function renderSeekPos() {

        if (!isSeeking) {
            setSeek(player.current?.seek() || 0)
        }
        if (playing) {
            set_raf(raf(renderSeekPos))
        }
    }

    function clearRAF() {
        raf.cancel(_raf);
    }

    useEffect(() => {
        // Get around weird state timing
        renderSeekPos();
    }, [playing])

    return (
        <div className='flex relative'>
            <ReactHowler
                src={song.song.url}
                playing={playing}
                onLoad={handleOnLoad}
                onPlay={handleOnPlay}
                onEnd={handleOnEnd}
                loop={loop}
                mute={mute}
                volume={volume}
                ref={(ref : ReactHowler) => {player.current = ref}}
            />
            <div className="w-full">
                <div className=" px-4 pt-4">
                    <div>
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
                        className="absolute -top-2 w-full h-2"
                        type='range'
                        min='0'
                        max={duration ? duration.toFixed(2) : 0}
                        step='.01'
                        value={seek}
                        onChange={handleSeekingChange}
                        onMouseDown={handleMouseDownSeek}
                        onMouseUp={handleMouseUpSeek}
                    />
                </div>
                <div className="px-4">
                    <div className="">
                        <button
                            onClick={(event) => handleStop()}
                        >
                            <FaStop className={`${playing ? 'opacity-50' : ''}`} />
                        </button>
                        <button
                            onClick={(event) => handleToggle()}
                        >
                            <FaPlay className={`${playing ? '' : 'opacity-50'}`} />
                        </button>
                    </div>
                </div>
                <div className="px-4 pb-4">
                    <div className="">
                        <ImVolumeMedium />
                        <input
                            className=""
                            type='range'
                            min='0'
                            max='1'
                            step='.05'
                            value={volume}
                            onChange={e => setVolume( parseFloat(e.target.value) )}
                        />
                    </div>
                    <div className="">
                        <Switch
                            checked={loop}
                            onChange={handleLoopToggle}
                            label="Loop"
                        />
                    </div>
                    <div className="">
                        <Switch
                            checked={mute}
                            onChange={handleMuteToggle}
                            label="Mute"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}