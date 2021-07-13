import styles from './styles.module.css';
import PlayPauseButton from './buttons/play-pause-button';
import MuteButton from './buttons/mute-button';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { getAlias, getCreator } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import { useEffect } from 'react';
import { playlistDefault } from '../../assets/images';
import { ipfsUrls } from '../../constants';
import PrevButton from './buttons/prev-button';
import NextButton from './buttons/next-button';
import ScrubberBar from './scrubber-bar';


const RadioPlayer = () => {
    const {
        audioError,
        playerState,
        controls,
    } = useRadio();
    const {tracks, creatorMetadata} = usePlaylist();

    // Todo: double check this actually works…
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
    const coverHash = track?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');
    return (
        <div className={styles.radioPlayerContainer}>
            <div className={styles.currentPlaylistImageHolder}>
                <img
                    src={track?.displayUri
                        ? `https://cloudflare-ipfs.com/ipfs/${track.displayUri.slice(7)}`
                        : playlistDefault}
                    srcSet={track?.displayUri ? srcSet : playlistDefault}
                    alt=""
                    className={styles.currentPlaylistImage}
                />
            </div>
            <div className={styles.controlsLayout}>
                <div className={styles.playerBar}>
                    <PrevButton tracks={tracks}/>
                    <PlayPauseButton/>
                    <NextButton tracks={tracks}/>
                    <input
                        className={`${styles.radioRange} ${styles.volumeControl}`}
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
                <ScrubberBar />
                <div className={styles.trackMetaRow}>
                    {track ? <AddToPlaylist track={track}/> : null}
                    {playerState.currentTrack !== null
                        ? (
                            <div className={styles.currentTrack}>
                            <span className={styles.trackRow_text}>
                                <a
                                    href={`https://hicetnunc.xyz/objkt/${track.id}`}
                                    className={styles.trackRow_link}
                                >#{track.id}</a>
                                {' '}
                                By <a
                                href={`https://hicetnunc.xyz/tz/${track.creator}`}
                                className={styles.trackRow_link}
                            >{getCreator(track.creator)} {getAlias(track, creatorMetadata)}</a>
                                <br/>
                                {track.name}
                            </span>
                            </div>
                        ) : null}
                </div>
                {audioError && <p className={styles.errorText}>{audioError}</p>}
            </div>
        </div>

    );
};

export default RadioPlayer;
