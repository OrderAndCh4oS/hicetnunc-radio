import { createContext, useRef, useState } from 'react';
import useAudio from '../hooks/use-audio';

export const RadioContext = createContext({audioRef: null});

let rAF;

const RadioProvider = ({children}) => {
    const scrubberRef = useRef();

    const {audio, audioContext, fetchSrc} = useAudio();
    const [playerState, setPlayerState] = useState({
        playing: false,
        currentTrackKey: 0,
        currentTrack: null,
        isPlaying: null,
        isLoading: false,
        isMuted: false,
        volume: 1,
        stateUpdatedBy: null,
    });
    const [runningTime, setRunningTime] = useState(0);
    const [audioError, setAudioError] = useState(null);

    const updateTrackPlayDuration = (audioEl) => () => {
        setRunningTime(audioEl.currentTime);
        rAF = requestAnimationFrame(updateTrackPlayDuration(audioEl));
    };

    const playAudio = async() => {
        try {
            setPlayerState(prevState => ({...prevState, isLoading: true}));
            cancelAnimationFrame(rAF);
            await audioContext.resume();
            await audio.play();
            rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
        } catch(e) {
            setAudioError('Failed to play track, could be an IPFS issue or unsupported media.');
            setTimeout(() => {
                setAudioError(null);
            }, 4000);
            console.log(e);
        } finally {
            setPlayerState(prevState => ({...prevState, isLoading: false}));
        }
    };

    const handlePlay = async() => {
        if(!audio) return;
        await playAudio();
        setPlayerState(prevState => ({...prevState, isPlaying: true}));
    };

    const handleSelectTrack = (tracks) => i => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        cancelAnimationFrame(rAF);
        // Note: Use fetchSrc if we have issues with duration not being present in the audio meta
        await fetchSrc(tracks[i].src, tracks[i].mimeType);
        // audio.src = tracks[i].src;
        // audio.mimeType = tracks[i].mimeType;
        await playAudio();
        setRunningTime(0);
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            currentTrack: tracks[i],
            isPlaying: true,
            isLoading: false,
        }));
        rAF = requestAnimationFrame(updateTrackPlayDuration(audio));
    };

    const handleInitialiseTrack = (tracks) => i => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        cancelAnimationFrame(rAF);
        // Note: Use fetchSrc if we have issues with duration not being present in the audio meta
        await fetchSrc(tracks[i].src, tracks[i].mimeType);
        // audio.src = tracks[i].src;
        // audio.mimeType = tracks[i].mimeType;
        setRunningTime(0);
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: i,
            currentTrack: tracks[i],
            isLoading: false,
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

    let timer;
    let throttle = 3;
    let lastTime = +new Date();
    const handleTimeChange = (event) => {
        if(!audio) return;
        const changeTime = () => {
            const timePercent = event.target.value;
            audio.currentTime = timePercent * audio.duration;
        };
        if(timer) clearTimeout(timer);
        const now = +new Date();
        if(now - lastTime > throttle) {
            changeTime();
            lastTime = now;
            return;
        }
        timer = setTimeout(changeTime, 5);
    };

    const handleVolumeChange = (event) => {
        if(!audio) return;
        const volume = event.target.value;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleVolumeUp = () => {
        if(!audio) return;
        const volume = playerState.volume + 0.05;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleVolumeDown = () => {
        if(!audio) return;
        const volume = playerState.volume - 0.05;
        audio.volume = volume;
        setPlayerState(prevState => ({...prevState, volume}));
    };

    const handleNext = (tracks) => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        const {currentTrackKey} = playerState;
        if(!tracks.length) return;
        const nextTrackKey = (currentTrackKey + 1) % tracks.length;
        // Note: Use fetchSrc if we have issues with duration not being present in the audio meta
        await fetchSrc(tracks[nextTrackKey].src, tracks[nextTrackKey].mimeType);
        // audio.src = tracks[nextTrackKey].src;
        // audio.mimeType = tracks[nextTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentTrack: tracks[nextTrackKey],
            isLoading: false,
        }));
    };

    const handlePrev = (tracks) => async() => {
        setPlayerState(prevState => ({...prevState, isLoading: true}));
        const {currentTrackKey} = playerState;
        if(!tracks.length) return;
        let prevTrackKey = currentTrackKey - 1;
        if(prevTrackKey < 0) prevTrackKey = tracks.length - 1;
        // Note: Use fetchSrc if we have issues with duration not being present in the audio meta
        await fetchSrc(tracks[prevTrackKey].src, tracks[prevTrackKey].mimeType);
        // audio.src = tracks[prevTrackKey].src;
        // audio.mimeType = tracks[prevTrackKey].mimeType;
        if(playerState.isPlaying) {
            audioContext.resume();
            audio.play();
        }
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: prevTrackKey,
            currentTrack: tracks[prevTrackKey],
            isLoading: false,
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
                scrubberRef,
                controls: {
                    play: handlePlay,
                    pause: handlePause,
                    mute: handleMute,
                    unmute: handleUnmute,
                    volume: handleVolumeChange,
                    time: handleTimeChange,
                    volumeUp: handleVolumeUp,
                    volumeDown: handleVolumeDown,
                    next: handleNext,
                    previous: handlePrev,
                    selectTrack: handleSelectTrack,
                    initialiseTrack: handleInitialiseTrack,
                },
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

