import { createContext, useState } from 'react';
import useAudio from '../hooks/use-audio';

export const RadioContext = createContext({audioRef: null});

let rAF;

const RadioProvider = ({children}) => {
    const {audio, audioContext} = useAudio();

    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrackKey: 0,
        currentTrack: null,
        isPlaying: null,
        isMuted: false,
        volume: 0.5,
        stateUpdatedBy: null,
    });
    const [runningTime, setRunningTime] = useState(0);
    const [audioError, setAudioError] = useState(null);

    const updateTrackPlayDuration = (audioEl) => () => {
        rAF = requestAnimationFrame(updateTrackPlayDuration(audioEl));
        setRunningTime(audioEl.currentTime);
    };

    const playAudio = async() => {
        try {
            cancelAnimationFrame(rAF);
            rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
            await audioContext.resume();
            await audio.play();
        } catch(e) {
            setAudioError('Failed to play track, possibly unsupported media.');
            setTimeout(() => {
                setAudioError(null);
            }, 4000);
            console.log(e);
        }
    };

    const handlePlay = async() => {
        if(!audio) return;
        await playAudio();
        setPlayerState(prevState => ({...prevState, isPlaying: true}));
    };

    const handleSelectTrack = (tracks) => i => async() => {
        cancelAnimationFrame(rAF);
        rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
        audio.src = tracks[i].src;
        audio.mimeType = tracks[i].mimeType;
        await playAudio();
        setRunningTime(0);
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            currentTrack: tracks[i],
            isPlaying: true,
        }));
    };

    const handlePause = () => {
        if(!audio) return;
        cancelAnimationFrame(rAF);
        audio.pause();
        setPlayerState(prevState => ({...prevState, isPlaying: false}));
    };

    const handleMute = () => {
        if(!audio) return;
        audio.volume = 0;
        setPlayerState(prevState => ({...prevState, isMuted: true}));
    };

    const handleUnmute = () => {
        if(!audio) return;
        audio.volume = playerState.volume;
        setPlayerState(prevState => ({...prevState, isMuted: false}));
    };

    const handleVolumeChange = (event) => {
        if(!audio) return;
        const volume = event.target.value;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleNext = (tracks) => () => {
        const {currentTrackKey} = playerState;
        if(!tracks.length) return;
        const nextTrackKey = (currentTrackKey + 1) % tracks.length;
        audio.src = tracks[nextTrackKey].src;
        audio.mimeType = tracks[nextTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentTrack: tracks[nextTrackKey],
        }));
    };

    const handlePrev = (tracks) => () => {
        const {currentTrackKey} = playerState;
        if(!tracks.length) return;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = tracks.length - 1;
        audio.src = tracks[prevTrackKey].src;
        audio.mimeType = tracks[prevTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: prevTrackKey,
            currentTrack: tracks[prevTrackKey],
        }));
    };

    const isTrackPlaying = id => playerState.isPlaying && playerState.currentTrack?.id === id;

    return (
        <RadioContext.Provider
            value={{
                audio: audio,
                audioContext,
                audioError,
                playerState,
                setPlayerState,
                isTrackPlaying,
                runningTime,
                controls: {
                    play: handlePlay,
                    pause: handlePause,
                    mute: handleMute,
                    unmute: handleUnmute,
                    volume: handleVolumeChange,
                    next: handleNext,
                    previous: handlePrev,
                    selectTrack: handleSelectTrack,
                },
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

