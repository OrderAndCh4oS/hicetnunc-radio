import { createContext } from 'react';

export const AudioContext = createContext({audioRef: null});

const AudioProvider = ({children}) => {
    const audio = new Audio();
    const audioContext = window.AudioContext
        ? new window.AudioContext()
        : new window.webkitAudioContext();
    const audioSource = audioContext.createMediaElementSource(audio);
    const gain = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);
    audioSource.connect(analyser);
    audioSource.connect(gain);
    analyser.fftSize = 64;
    const bufferLength = analyser.frequencyBinCount;
    const dataFloatArray = new Float32Array(bufferLength);
    const dataByteArray = new Uint8Array(bufferLength);

    const fetchSrc = async(url, mimeType) => {
        const audioResponse = await fetch(url, {
            method: 'get',
            headers: {'Accept': mimeType},
        });
        const blob = await audioResponse.blob();
        audio.mimeType = mimeType;
        audio.preload = 'metadata';
        audio.src = URL.createObjectURL(blob);
    };

    return (
        <AudioContext.Provider
            value={{
                audio,
                audioContext,
                analyser,
                bufferLength,
                dataFloatArray,
                dataByteArray,
                fetchSrc,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;

