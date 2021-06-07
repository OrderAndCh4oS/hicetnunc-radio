import styles from './styles.module.css';
import { playlistDefault } from '../../assets/images';
import { useState } from 'react';
import { getCreator } from '../../utilities/general';

const Playlists = ({handlePlaylistChange, playlists}) => {
    const [filteredPlaylists, setFilteredPlaylists] = useState([]);

    const handleSearch = (event) => {
        const search = event.target.value.toLowerCase();
        const nextFilteredPlaylists = playlists.filter(p => {
            if(search.length < 2) return false;
            if(p.name.toLowerCase().includes(search)) return true;
            if(p.curator.toLowerCase().includes(search)) return true;
            for(const track of p.tracks) {
                if(track.name.toLowerCase().includes(search)) return true;
                if(track.id.toString().toLowerCase().includes(search)) return true;
                if(track.creator.toLowerCase().includes(search)) return true;
            }
            return false;
        });
        setFilteredPlaylists(nextFilteredPlaylists);
    };

    return <div className={styles.playlistContainer}>
        <h2 className={styles.playlistTitle}>Playlists</h2>
        <input className={styles.searchInput} onKeyUp={handleSearch}/>
        {!filteredPlaylists.length
            ? (
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
            ) : (
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
                                        >{getCreator(t.creator)}</a>
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
            )}
    </div>;
};

export default Playlists;
