import styles from '../styles.module.css';
import UnmuteIcon from '../icons/unmute-icon';
import MuteIcon from '../icons/mute-icon';
import useRadio from '../../../hooks/use-radio';

const MuteButton = () => {
    const {
        controls,
        playerState,
    } = useRadio();
    return <>
        {playerState.isMuted ? (
            <button
                className={`${styles.button} ${styles.button_unmute} ${styles.playerIconHolder}`}
                onClick={controls.unmute}
            >
                <UnmuteIcon/>
            </button>
        ) : (
            <button
                className={`${styles.button} ${styles.button_mute} ${styles.playerIconHolder}`}
                onClick={controls.mute}
            >
                <MuteIcon/>
            </button>
        )}
    </>;
};

export default MuteButton;
