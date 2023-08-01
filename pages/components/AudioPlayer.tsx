import React, {ReactElement, useRef, useState} from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf'
import { ImVolumeMedium } from 'react-icons/im'
import { FaPlay, FaStop } from 'react-icons/fa'
import Switch from './Switch'
import Loading from './Loading'
import TimeItem from './TimeItem'

function AudioPlayer({src, title, artist} : { src : string, title: string, artist: string}) : ReactElement {
    const [playing, setPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [loop, setLoop] = useState(false);
    const [mute, setMute] = useState(false);
    const [volume, setVolume] = useState(1.0);
    const [seek, setSeek] = useState(0.0);
    const [rate, setRate] = useState(1);
    const [isSeeking, setIsSeeking] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [thisRaf, setThisRaf] = useState(null);
    const player = useRef<ReactHowler | null>(null);

    function handleToggle() {
        setPlaying(!playing);
    }

    function handleOnLoad() {
        setLoaded(true);
        setDuration(player.current.duration());
    }

    function handleOnPlay() {
        setPlaying(true);
        renderSeekPos();
    }

    function handleOnEnd() {
        setPlaying(false);
        clearRAF();
    }

    function handleStop() {
        player.current.stop();
        setPlaying(false);
        renderSeekPos();
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
        player.current.seek(e.target.value);
    }

    function handleSeekingChange(e : any) {
        setSeek(parseFloat(e.target.value));
    }

    function renderSeekPos() {
        if (!isSeeking) {
            setSeek(player.current.seek())
        }
        if (playing) {
            setThisRaf(raf(renderSeekPos))
        }
    }

    function handleRate(e : any) {
        let newRate = parseFloat(e.target.value)
        player.current.rate(newRate)
        setRate(newRate);
    }

    function clearRAF() {
        raf.cancel(thisRaf);
    }

    return (
        <div className='w-full flex flex-row fixed bottom-0 left-0 right-0 px-4 py-4 bg-gradient-to-r from-emerald-500 to-emerald-300'>
            <ReactHowler
                src={src}
                playing={playing}
                onLoad={handleOnLoad}
                onPlay={handleOnPlay}
                onEnd={handleOnEnd}
                loop={loop}
                mute={mute}
                volume={volume}
                ref={(ref) => {player.current = ref}}
            />
            <div className="grid grid-col-1 w-full">
                <div className="w-full">
                    <Loading loaded={loaded} title={title} artist={artist} />
                    <div>
                        <TimeItem
                            time={seek.toFixed(2)}
                        />
                        {' / '}
                        <TimeItem
                            time={(duration) ? duration.toFixed(2) : 'NaN'}
                        />
                    </div>
                </div>
                <div className="w-full">
                    <input
                        className="w-full"
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
                <div className="w-full">
                    <div className="inline-flex">
                        <button
                            onClick={handleStop}
                        >
                            <FaStop className={`${playing ? 'opacity-50' : ''}`} />
                        </button>
                        <button
                            onClick={handleToggle}
                        >
                            <FaPlay className={`${playing ? '' : 'opacity-50'}`} />
                        </button>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex">
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
                    <div className="flex">
                        <Switch
                            checked={loop}
                            onChange={handleLoopToggle}
                            label="Loop"
                        />
                    </div>
                    <div className="flex">
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

export default AudioPlayer