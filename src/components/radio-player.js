import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { createRef } from 'react/cjs/react.production.min';
import MuteButton from './mute-button';
import PlayPauseButton from './play-pause-button';

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
        console.log('asac', audioState.audioContext);
        if(!audioRef.current) return;
        if(audioState.audioContext) return;
        console.log('HERE');
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
        audioState.audioContext.resume();
        audioRef.current.play();
        setPlayerState(prevState => ({...prevState, isPlaying: true}));
    };

    const handlePause = () => {
        if(!audioRef.current) return;
        audioRef.current.pause();
        setPlayerState(prevState => ({...prevState, isPlaying: false}));
    };

    const handleMute = () => {
        if(!audioRef.current) return;
        audioRef.current.volume = 0;
        setPlayerState(prevState => ({...prevState, isMuted: true}));
    };

    const handleUnmute = () => {
        if(!audioRef.current) return;
        audioRef.current.volume = playerState.volume;
        setPlayerState(prevState => ({...prevState, isMuted: false}));
    };

    const handleVolumeChange = (event) => {
        if(!audioRef.current) return;
        const volume = event.target.value;
        audioRef.current.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    if(!tracks) return <p>Loading...</p>;

    return (
        <div className={styles.radioPlayerContainer}>
            <audio ref={audioRef}/>
            <div className="playerBar">
                <div className="controlsHolder">
                    <PlayPauseButton
                        isPlaying={playerState.isPlaying}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
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
                    <MuteButton
                        isMuted={playerState.isMuted}
                        handleMute={handleMute}
                        handleUnmute={handleUnmute}
                    />
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
