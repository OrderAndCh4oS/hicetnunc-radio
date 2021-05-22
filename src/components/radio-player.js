import { useEffect, useState } from 'react';
import PlayIcon from './play-icon';
import MuteIcon from './mute-icon';
import styles from './styles.module.css';
import { createRef } from 'react/cjs/react.production.min';

const RadioPlayer = ({audioObjkts}) => {
    const [audioState, setAudioState] = useState({
        audioContext: null,
        source: null,
        gain: null,
        analyser: null,
        bufferLength: null,
        dataArray: null,
    })
    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrack: null,
        isMuted: false,
        volume: 0.5
    });
    const [tracks, setTracks] = useState(null);
    const audioRef = createRef();
    const canvas = createRef();

    useEffect(() => {
        console.log(audioObjkts);
        setTracks(audioObjkts.map(o => `https://cloudflare-ipfs.com/ipfs/${o.ipfsHash}`));
    }, [audioObjkts]);

    useEffect(() => {
        if(!tracks?.length || !audioRef.current) return;
        audioRef.current.src = tracks[0]
    }, [audioState, tracks])

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
        })
    }, [audioRef])

    const handlePlay = () => {
        if(!audioRef.current) return;
        console.log('PLAY')
        audioRef.current.play();
    };

    const handlePause = () => {
        if(!audioRef.current) return
        audioRef.current.pause();
    };

    const handleMute = (event) => {
        if(!audioRef.current) return
        audioRef.current.volume = audioState.isMuted ? 0 : event.target.value;
    };

    const handleVolumeChange = (event) => {
        if(!audioRef.current) return
        const volume = event.target.value;
        audioRef.current.volume = volume;
        setPlayerState({volume})
    };

    if(!tracks) return <p>Loading...</p>;

    return (
        <div className={styles.radioPlayerContainer}>
            <audio ref={audioRef}/>
            <div className="playerBar">
                <div className="controlsHolder">
                    <button
                        id="play"
                        className={`${styles.button} ${styles.button_play} ${styles.button_playerControl}`}
                        onClick={handlePlay}
                    >
                        <PlayIcon/>
                    </button>
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
                    <button
                        id="mute"
                        className={`${styles.button} ${styles.button_mute} ${styles.button_playerControl}`}
                        onClick={handleMute}
                    >
                        <MuteIcon/>
                    </button>
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
