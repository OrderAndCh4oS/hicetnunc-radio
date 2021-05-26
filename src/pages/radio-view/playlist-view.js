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
            <div className={styles.currentPlaylistWrapper}>
                <div className={styles.currentPlaylistRow}>
                    <div className={styles.currentPlaylistColumnImage}>
                            <img
                                    src="https://learnodo-newtonic.com/wp-content/uploads/2016/09/Composition-with-Large-Red-Plane-Yellow-Black-Gray-and-Blue-1921-Piet-Mondrian.jpg"
                                    alt=""
                                    className={styles.currentPlaylistImage}
                            />
                    </div>
                    <div className={styles.currentPlaylistColumnInfo}>
                        <h1 className={styles.currentPlaylistText}>{selectedPlaylist.name}</h1>
                        <p className={styles.currentPlaylistArtist}>by:<a href="https://hicetnunc.xyz">{selectedPlaylist.curator}</a></p>
                        <p className={styles.currentPlaylistDescription}>A cyber rasta dub reggae playlist for virtual zion</p>
                    </div>
                </div>
            </div>
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


