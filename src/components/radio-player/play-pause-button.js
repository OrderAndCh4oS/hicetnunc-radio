import styles from './styles.module.css';
import PauseIcon from './pause-icon';
import PlayIcon from './play-icon';
import useRadio from '../../hooks/use-radio';

const PlayPauseButton = () => {
    const {controls, playerState} = useRadio();
    return <>
        {playerState.isPlaying ? (
            <button
                className={`${styles.button} ${styles.button_play} ${styles.button_playerControl}`}
                onClick={controls.pause}
            >
                <PauseIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_pause} ${styles.button_playerControl}`}
                onClick={controls.play}
            >
                <PlayIcon/>
            </button>
        )}
    </>;
};

export default PlayPauseButton;
