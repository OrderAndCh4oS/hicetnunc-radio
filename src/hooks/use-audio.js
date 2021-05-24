import { useContext } from 'react';
import { AudioContext } from '../context/audio-context';

const useAudio = () => useContext(AudioContext);

export default useAudio;
