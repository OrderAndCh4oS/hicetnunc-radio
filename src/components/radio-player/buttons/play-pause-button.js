import styles from '../styles.module.css';
import PauseIcon from '../icons/pause-icon';
import PlayIcon from '../icons/play-icon';
import useRadio from '../../../hooks/use-radio';
import LoadingIcon from '../icons/loading-icon';

const PlayPauseButton = () => {
    const {controls, playerState} = useRadio();
    if(playerState.isLoading) return (
        <span className={`${styles.playerIconHolder} ${styles.icon_loading} ${styles.playerIconHolder}`}>
            <LoadingIcon/>
        </span>
    );
    return <>
        {playerState.isPlaying ? (
            <button
                className={`${styles.button} ${styles.button_pause} ${styles.playerIconHolder}`}
                onClick={controls.pause}
            >
                <PauseIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_play} ${styles.playerIconHolder}`}
                onClick={controls.play}
            >
                <PlayIcon/>
            </button>
        )}
    </>;
};

export default PlayPauseButton;
