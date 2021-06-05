
import { createContext } from 'react';

export const AudioContext = createContext({audioRef: null});

const AudioProvider = ({children}) => {
    const audio = new Audio();

    const audioContext = window.AudioContext
        ? new window.AudioContext()
        : new window.webkitAudioContext();
    const source = audioContext.createMediaElementSource(audio);
    const gain = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    analyser.connect(audioContext.destination);
    source.connect(analyser);
    source.connect(gain);
    analyser.fftSize = 64;
    // const bufferLength = analyser.frequencyBinCount;
    // const dataArray = new Float32Array(bufferLength);

    return (
        <AudioContext.Provider
            value={{
                audio: audio,
                audioContext,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
};

export default AudioProvider;

