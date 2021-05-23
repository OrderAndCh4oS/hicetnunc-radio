import styles from './styles.module.css';
import UnmuteIcon from './unmute-icon';
import MuteIcon from './mute-icon';

const MuteButton = ({isMuted, handleMute, handleUnmute}) => {
    return <>
        {isMuted ? (
            <button
                className={`${styles.button} ${styles.button_unmute} ${styles.button_playerControl}`}
                onClick={handleUnmute}
            >
                <UnmuteIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_mute} ${styles.button_playerControl}`}
                onClick={handleMute}
            >
                <MuteIcon/>
            </button>
        )}
    </>;
};

export default MuteButton;
