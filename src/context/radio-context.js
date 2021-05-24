import { createContext } from 'react';

export const RadioContext = createContext({audioRef: null});

const RadioProvider = ({children}) => {
    const audio = new Audio();

    const audioContext = AudioContext ? new AudioContext() : new window.webkitAudioContext();
    console.log(audioContext)
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
        <RadioContext.Provider
            value={{
                audio: audio,
                audioContext,
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};

export default RadioProvider;

