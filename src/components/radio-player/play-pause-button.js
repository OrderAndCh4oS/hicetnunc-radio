import styles from './styles.module.css';
import PauseIcon from './pause-icon';
import PlayIcon from './play-icon';
import { useEffect } from 'react';

const PlayPauseButton = ({isPlaying, handlePlay, handlePause}) => {
    useEffect(() => {
        console.log('isPlaying', isPlaying);
    }, [isPlaying]);
    return <>
        {isPlaying ? (
            <button
                className={`${styles.button} ${styles.button_play} ${styles.button_playerControl}`}
                onClick={handlePause}
            >
                <PauseIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_pause} ${styles.button_playerControl}`}
                onClick={handlePlay}
            >
                <PlayIcon/>
            </button>
        )}
    </>;
};

export default PlayPauseButton
