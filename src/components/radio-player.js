import { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { createRef } from 'react/cjs/react.production.min';
import MuteButton from './mute-button';
import PlayPauseButton from './play-pause-button';
import PauseIcon from './pause-icon';
import PlayIcon from './play-icon';

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
        currentTrackKey: 0,
        isPlaying: false,
        isMuted: false,
        volume: 0.5,
    });
    const [tracks, setTracks] = useState(null);
    const audioRef = createRef();

    useEffect(() => {
        console.log(audioObjkts);
        setTracks(audioObjkts.map(o => ({
            name: o.token_info.name,
            src: `https://cloudflare-ipfs.com/ipfs/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
        })));
    }, [audioObjkts]);

    useEffect(() => {
        if(!tracks?.length || !audioRef.current) return;
        if(audioRef.current.src) return;
        audioRef.current.crossOrigin = 'anonymous';
        audioRef.current.src = tracks[0].src;
        audioRef.current.volume = playerState.volume;
        audioRef.current.mimeType = tracks[0].mimeType;
    }, [audioState, tracks]);

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

    const handleNext = () => {
        const {currentTrackKey} = playerState;
        const nextTrackKey = (currentTrackKey + 1) % tracks.length;
        audioRef.current.src = tracks[nextTrackKey].src;
        if(playerState.isPlaying) {
            audioState.audioContext.resume();
            audioRef.current.play();
        }
        setPlayerState(prevState => ({...prevState, currentTrackKey: nextTrackKey}));
    };

    const handlePrev = () => {
        const {currentTrackKey} = playerState;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = tracks.length - 1;
        audioRef.current.src = tracks[prevTrackKey].src;
        if(playerState.isPlaying) {
            audioState.audioContext.resume();
            audioRef.current.play();
        }
        setPlayerState(prevState => ({...prevState, currentTrackKey: prevTrackKey}));
    };

    if(!tracks) return <p>Loading...</p>;

    const selectTrack = i => () => {
        audioRef.current.src = tracks[i].src;
        audioState.audioContext.resume();
        audioRef.current.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            isPlaying: true,
        }));
    };

    const isTrackPlaying = i => playerState.isPlaying && playerState.currentTrackKey === i;

    return (
        <div className={styles.radioPlayerContainer}>
            <audio ref={audioRef}/>
            <div className={styles.playerBar}>
                <div className={styles.controlsHolder}>
                    <PlayPauseButton
                        isPlaying={playerState.isPlaying}
                        handlePlay={handlePlay}
                        handlePause={handlePause}
                    />
                    <input
                        className={styles.radioRange}
                        title="volume"
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
            <div className={styles.nextPrevControls}>
                <button
                    className={styles.button_prevTrack}
                    onClick={handlePrev}
                >
                    Prev
                </button>
                <button
                    className={styles.button_nextTrack}
                    onClick={handleNext}
                >
                    Next
                </button>
                <div className={styles.currentTrack}>{tracks[playerState.currentTrackKey].name}</div>
            </div>
            <div>
                {tracks.map((t, i) =>
                    <div className={styles.trackRow}>
                        {isTrackPlaying(i) ? <button
                                className={`${styles.button} ${styles.button_pause_small} ${styles.button_playerControl_small}`}
                                onClick={handlePause}
                            ><PauseIcon/></button>
                            : <button
                                className={`${styles.button} ${styles.button_play_small} ${styles.button_playerControl_small}`}
                                onClick={selectTrack(i)}
                            ><PlayIcon/></button>}
                        <span className={styles.trackRow_name}>{t.name}</span>
                    </div>,
                )}
            </div>
        </div>
    );
};

export default RadioPlayer;
