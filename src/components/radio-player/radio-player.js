import styles from './styles.module.css';
import PlayPauseButton from './play-pause-button';
import MuteButton from './mute-button';
import getAudioTime from '../../utilities/get-audio-time';
import useRadio from '../../hooks/use-radio';

const RadioPlayer = ({tracks}) => {
    const {
        audio,
        audioError,
        playerState,
        controls,
        runningTime
    } = useRadio();

    return (
        <div className={styles.radioPlayerContainer}>
            <div className={styles.playerBar}>
                <div className={styles.controlsHolder}>
                    <PlayPauseButton/>
                    <input
                        className={styles.radioRange}
                        title="volume"
                        type="range"
                        value={playerState.volume}
                        min="0"
                        max="1"
                        step="0.01"
                        onChange={controls.volume}
                    />
                    <MuteButton/>
                </div>
                <div className={styles.runningTime}>{getAudioTime(runningTime)} of {getAudioTime(
                    audio.duration)}</div>
            </div>
            <div className={styles.nextPrevControls}>
                <button
                    className={styles.button_prevTrack}
                    onClick={controls.previous(tracks)}
                >Prev
                </button>
                <button
                    className={styles.button_nextTrack}
                    onClick={controls.next(tracks)}
                >Next
                </button>
                {playerState.currentTrackKey !== null
                    ? (
                        <div className={styles.currentTrack}>
                            {tracks[playerState.currentTrackKey]?.name || ''}
                        </div>
                    ) : null}
            </div>
            {audioError && <p className={styles.errorText}>{audioError}</p>}
        </div>
    )
}

export default RadioPlayer