import styles from './styles.module.css';
import PauseIcon from '../radio-player/pause-icon';
import PlayIcon from '../radio-player/play-icon';
import { getAlias, getCreator } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import RemoveFromPlaylist from '../add-to-playlist/remove-from-playlist';

const TrackList = ({
    tracks,
    isTrackPlaying,
    handlePause,
    handleSelectTrack,
    creatorMetadata,
    playlist,
}) => <>
    {!tracks.length ? <p>No audio tracks available</p> : (
        <div>
            {tracks.map((t, i) =>
                <div key={t.id} className={styles.trackRow}>
                    {isTrackPlaying(t.id)
                        ? (
                            <button
                                className={`${styles.button} ${styles.button_pause_small} ${styles.button_playerControl_small}`}
                                onClick={handlePause}
                            ><PauseIcon/></button>
                        ) : (
                            <button
                                className={`${styles.button} ${styles.button_play_small} ${styles.button_playerControl_small}`}
                                onClick={handleSelectTrack(i)}
                            ><PlayIcon/></button>
                        )}
                    {
                        playlist?.curator === 'Mine'
                            ? <RemoveFromPlaylist
                                playlistName={playlist.name}
                                track={t}
                            />
                            : <AddToPlaylist track={t}/>
                    }
                    <span className={styles.trackRow_text}>
                        <a
                            href={`https://hicetnunc.xyz/objkt/${t.id}`}
                            className={styles.trackRow_link}
                        >#{t.id} {t.name}</a>
                        <br/>
                        By <a
                        href={`https://hicetnunc.xyz/tz/${t.creator}`}
                        className={styles.trackRow_link}
                    >
                        {getCreator(t.creator)} {getAlias(t, creatorMetadata)}
                    </a>
                            </span>
                    <img
                        alt={'Artist\'s avatar'}
                        className={styles.trackRow_avatar}
                        src={`https://services.tzkt.io/v1/avatars2/${t.creator}`}
                    />
                </div>,
            )}
        </div>
    )}
</>;

export default TrackList;