import { useContext } from 'react';
import { RadioContext } from '../context/radio-context';

const useRadio = () => useContext(RadioContext);

export default useRadio;
