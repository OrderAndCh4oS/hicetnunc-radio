import styles from './styles.module.css';
import { playlists } from '../../playlists/playlists';
import { playlistDefault } from '../../assets/images';

const Playlists = ({handlePlaylistChange}) =>
    <div className={styles.playlistContainer}>
        <h2 className={styles.playlistTitle}>Playlists</h2>
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
    </div>;

export default Playlists;
