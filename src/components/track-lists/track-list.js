import styles from './styles.module.css';
import PauseIcon from '../radio-player/icons/pause-icon';
import PlayIcon from '../radio-player/icons/play-icon';
import { getAlias, getCreator } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import RemoveFromPlaylist from '../add-to-playlist/remove-from-playlist';
import useRadio from '../../hooks/use-radio';
import LoadingIcon from '../radio-player/icons/loading-icon';

const TrackList = ({
    tracks,
    isTrackPlaying,
    creatorMetadata,
    playlist,
}) => {
    const {controls, playerState} = useRadio();
    const handleSelectTrack = controls.selectTrack(tracks);

    const renderPlayPauseButton = (id, i) => {
        if(playerState.isLoading) return (
            <span className={`${styles.icon_loading_small} ${styles.playerControlIcon_small}`}>
                <LoadingIcon/>
            </span>
        );
        return isTrackPlaying(id)
            ? (
                <button
                    className={`${styles.button} ${styles.button_pause_small} ${styles.playerControlIcon_small}`}
                    onClick={controls.pause}
                ><PauseIcon/></button>
            ) : (
                <button
                    className={`${styles.button} ${styles.button_play_small} ${styles.playerControlIcon_small}`}
                    onClick={handleSelectTrack(i)}
                ><PlayIcon/></button>
            );
    };
    return <>
        {!tracks.length ? <p>No audio tracks available</p> : (
            <div>
                {tracks.map((t, i) =>
                    <div key={t.id} className={styles.trackRow}>
                        {renderPlayPauseButton(t.id, i)}
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
};

export default TrackList;
