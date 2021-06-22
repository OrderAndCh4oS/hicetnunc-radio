import styles from './styles.module.css';
import { playlistDefault } from '../../assets/images';
import { trimWalletAddress } from '../../utilities/general';

const FoundPlaylists = ({filteredPlaylists, handlePlaylistChange}) =>
    <div className={styles.filteredPlaylists}>
        {filteredPlaylists.map(p => (
            <div className={styles.filteredPlaylists_row}>
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
                </button>
                <div className={styles.filteredPlaylists_info}>
                    <h3 className={styles.filteredPlaylists_title}>{p.name}</h3>
                    <p className={styles.filteredPlaylists_subTitle}>{p.curator}</p>
                    {p.tracks.map(t => (
                        <div className={styles.trackRow}>
                                        <span className={styles.trackRow_text}>
                                            <a
                                                href={`https://hicetnunc.xyz/objkt/${t.id}`}
                                                className={styles.trackRow_link}
                                            >#{t.id} {t.name}</a>
                                            <br/>By <a
                                            href={`https://hicetnunc.xyz/tz/${t.creator}`}
                                            className={styles.trackRow_link}
                                        >{trimWalletAddress(t.creator)}</a>
                                        </span>
                            <img
                                alt={'Artist\'s avatar'}
                                className={styles.trackRow_avatar}
                                src={`https://services.tzkt.io/v1/avatars2/${t.creator}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
;

export default FoundPlaylists;
