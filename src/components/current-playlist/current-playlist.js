import styles from './styles.module.css';
import { playlistDefault } from '../../assets/images';

const CurrentPlaylist = ({playlist}) => {
    return (
        <div className={styles.currentPlaylistWrapper}>
            <div className={styles.currentPlaylistRow}>
                <div className={styles.currentPlaylistColumnImage}>
                    <img
                        src={playlist.img || playlistDefault}
                        alt=""
                        className={styles.currentPlaylistImage}
                    />
                </div>
                <div className={styles.currentPlaylistColumnInfo}>
                    <h1 className={styles.currentPlaylistText}>{playlist.name}</h1>
                    <p className={styles.currentPlaylistArtist}>By <a href="https://hicetnunc.xyz">{playlist.curator}</a>
                    </p>
                    <p className={styles.currentPlaylistDescription}>{playlist.description}</p>
                </div>
            </div>
        </div>
    );
};

export default CurrentPlaylist;
