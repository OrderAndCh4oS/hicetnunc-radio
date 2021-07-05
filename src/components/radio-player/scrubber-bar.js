import styles from './styles.module.css';
import getAudioTime from '../../utilities/get-audio-time';
import useRadio from '../../hooks/use-radio';

const ScrubberBar = () => {
    const {
        audio,
        controls,
        runningTime,
        scrubberRef,
    } = useRadio();

    return (
        <div className={styles.scrubberBar}>
            <input
                ref={scrubberRef}
                className={styles.radioRange}
                title="time"
                type="range"
                value={runningTime ? runningTime / audio.duration : 0}
                min="0"
                max="1"
                step="0.001"
                onChange={controls.time}
            />
            <div className={styles.runningTime}>
                {getAudioTime(runningTime)} of {getAudioTime(audio.duration)}
            </div>
        </div>
    );
};

export default ScrubberBar;
