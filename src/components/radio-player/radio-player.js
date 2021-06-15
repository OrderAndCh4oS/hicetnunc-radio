import styles from './styles.module.css';
import PlayPauseButton from './play-pause-button';
import MuteButton from './mute-button';
import getAudioTime from '../../utilities/get-audio-time';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { getAlias, getCreator } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import { useEffect } from 'react';

const RadioPlayer = () => {
    const {
        audio,
        audioError,
        playerState,
        controls,
        runningTime,
        scrubberRef,
    } = useRadio();
    const {tracks, creatorMetadata} = usePlaylist();

    useEffect(() => {
        const keyUpListener = document.addEventListener('keydown', async(event) => {
            if(!tracks) return;
            switch(event) {
                case 'MediaPlayPause':
                    if(!playerState.isPlaying) { await controls.play(); } else { await controls.pause(); }
                    break;
                case 'MediaStop':
                    await controls.pause();
                    break;
                case 'MediaTrackPrevious':
                    await controls.previous(tracks);
                    break;
                case 'MediaTrackNext':
                    await controls.next(tracks);
                    break;
                case 'VolumeUp':
                    await controls.volumeUp();
                    break;
                case 'VolumeDown':
                    await controls.volumeDown();
                    break;
                case 'VolumeMute':
                    if(playerState.isMuted) { await controls.unmute(); } else { await controls.mute(); }
                    break;
                default:
                    return;
            }
        });
        return () => {
            document.removeEventListener('keydown', keyUpListener);
        };
    });

    if(!tracks) return null;

    const track = playerState.currentTrack;

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
                <div className={styles.runningTime}>
                    {getAudioTime(runningTime)} of {getAudioTime(audio.duration)}
                </div>
            </div>
            <div className={styles.scrubber}>
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
                {track ? <AddToPlaylist track={track}/> : null}
                {playerState.currentTrack !== null
                    ? (
                        <div className={styles.currentTrack}>
                            <span className={styles.trackRow_text}>
                        <a
                            href={`https://hicetnunc.xyz/objkt/${track.id}`}
                            className={styles.trackRow_link}
                        >#{track.id} {track.name}</a>
                        <br/>
                        By <a
                                href={`https://hicetnunc.xyz/tz/${track.creator}`}
                                className={styles.trackRow_link}
                            >{getCreator(track.creator)} {getAlias(track, creatorMetadata)}</a>
                            </span>
                        </div>
                    ) : null}
            </div>
            {audioError && <p className={styles.errorText}>{audioError}</p>}
        </div>
    );
};

export default RadioPlayer;
