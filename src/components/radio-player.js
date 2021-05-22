import { useEffect, useState } from 'react';
import PlayIcon from './play-icon';
import MuteIcon from './mute-icon';
import styles from './styles.module.css';
import { createRef } from 'react/cjs/react.production.min';
import PauseIcon from './pause-icon';
import UnmuteIcon from './unmute-icon';

const RadioPlayer = ({audioObjkts}) => {
    const [audioState, setAudioState] = useState({
        audioContext: null,
        source: null,
        gain: null,
        analyser: null,
        bufferLength: null,
        dataArray: null,
    });
    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrack: null,
        isPlaying: false,
        isMuted: false,
        volume: 0.5,
    });
    const [tracks, setTracks] = useState(null);
    const audioRef = createRef();
    const canvas = createRef();
    const {isMuted, isPlaying} = playerState;

    useEffect(() => {
        console.log(audioObjkts);
        setTracks(audioObjkts.map(o => ({
            track: `https://cloudflare-ipfs.com/ipfs/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
        })));
    }, [audioObjkts]);

    useEffect(() => {
        if(!tracks?.length || !audioRef.current) return;
        if(audioRef.current.src) return;
        audioRef.current.crossOrigin = 'anonymous';
        audioRef.current.src = tracks[0].track;
        audioRef.current.volume = playerState.volume;
        audioRef.current.mimeType = tracks[0].mimeType;
    }, [audioState, tracks]);

    const handleNext = () => {
        console.log('clicked next');
    };

    const handlePrev = () => {
        console.log('clicked prev');
    };

    useEffect(() => {
        if(!audioRef.current) return;
        if(audioState.audioContext) return;
        const audioContext = new AudioContext();
        const source = audioContext.createMediaElementSource(audioRef.current);
        const gain = audioContext.createGain();
        const analyser = audioContext.createAnalyser();
        analyser.connect(audioContext.destination);
        source.connect(analyser);
        source.connect(gain);
        analyser.fftSize = 64;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Float32Array(bufferLength);
        setAudioState({
            audioContext,
            source,
            gain,
            analyser,
            bufferLength,
            dataArray,
        });
    }, [audioRef]);

    const handlePlay = () => {
        if(!audioRef.current) return;
        console.log('PLAY');
        audioState.audioContext.resume();
        audioRef.current.play();
        setAudioState({isPlaying: true});
    };

    const handlePause = () => {
        if(!audioRef.current) return;
        audioRef.current.pause();
        setAudioState({isPlaying: false});
    };

    const handleMute = (event) => {
        if(!audioRef.current) return;
        audioRef.current.volume = 0;
    };

    const handleUnmute = (event) => {
        if(!audioRef.current) return;
        audioRef.current.volume = playerState.volume;
    };

    const handleVolumeChange = (event) => {
        if(!audioRef.current) return;
        const volume = event.target.value;
        audioRef.current.volume = volume;
        setPlayerState({volume});
    };

    if(!tracks) return <p>Loading...</p>;

    return (
        <div className={styles.radioPlayerContainer}>
            <audio ref={audioRef}/>
            <div className="playerBar">
                <div className="controlsHolder">
                    {isPlaying ? (
                        <button
                            className={`${styles.button} ${styles.button_play} ${styles.button_playerControl}`}
                            onClick={handlePause}
                        >
                            <PauseIcon/>
                        </button>
                    ) : (
                        <button
                            className={`${styles.button} ${styles.button_pause} ${styles.button_playerControl}`}
                            onClick={handlePlay}
                        >
                            <PlayIcon/>
                        </button>
                    )}
                    <input
                        className={styles.radioRange}
                        title="volume"
                        id="volume"
                        type="range"
                        value={playerState.volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={handleVolumeChange}
                    />
                    {isMuted ? (
                        <button
                            className={`${styles.button} ${styles.button_unmute} ${styles.button_playerControl}`}
                            onClick={handleUnmute}
                        >
                            <UnmuteIcon/>
                        </button>
                    ) : (
                        <button
                            className={`${styles.button} ${styles.button_mute} ${styles.button_playerControl}`}
                            onClick={handleMute}
                        >
                            <MuteIcon/>
                        </button>
                    )}
                </div>
            </div>
            <div className="canvasWrapper">
                <canvas ref={canvas}/>
            </div>
            {/*<div className="currentTrack">{currentTrack}</div>*/}
        </div>
    );
};

export default RadioPlayer;
