import styles from './styles.module.css';
import { playlistDefault } from '../../assets/images';

const PlaylistThumbs = ({playlists, handlePlaylistChange}) =>
    <div className={styles.playlistGrid}>
        {playlists.map(p => (
            <button
                key={p.name}
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
        ))}
    </div>
;

export default PlaylistThumbs;
