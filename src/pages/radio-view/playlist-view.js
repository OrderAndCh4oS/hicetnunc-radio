import styles from './styles.module.css';
import { useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';
import { playlistDefault } from '../../assets/images';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            <p className={styles.currentPlaylistText}>Playlist: {selectedPlaylist.name}</p>
            <PlaylistPlayer playlist={selectedPlaylist}/>
            <div className={styles.playlistContainer}>
                <h2 className={styles.playlistTitle}>Playlists</h2>
                <div className={styles.playlistGrid}>
                    {playlists.map(p => (
                        <div>
                            <button
                                onClick={handlePlaylistChange(p)}
                                className={styles.playlistButton}
                            >
                                <img
                                    src={p.img || playlistDefault}
                                    alt=""
                                    className={styles.playlistImage}
                                />
                                <p className={styles.playlistText}>{p.name}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default PlaylistView;


