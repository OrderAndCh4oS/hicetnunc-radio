import styles from './styles.module.css';
import UnmuteIcon from './unmute-icon';
import MuteIcon from './mute-icon';
import useRadio from '../../hooks/use-radio';

const MuteButton = () => {
    const {
        controls,
        playerState,
    } = useRadio();
    return <>
        {playerState.isMuted ? (
            <button
                className={`${styles.button} ${styles.button_unmute} ${styles.button_playerControl}`}
                onClick={controls.unmute}
            >
                <UnmuteIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_mute} ${styles.button_playerControl}`}
                onClick={controls.mute}
            >
                <MuteIcon/>
            </button>
        )}
    </>;
};

export default MuteButton;
