import styles from './styles.module.css';
import { useState } from 'react';
import FoundPlaylists from './found-playlists';
import PlaylistThumbs from './playlist-thumbs';
import CreatePlaylist from './create-playlist';

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

    return (
        <div className={styles.playlistContainer}>
            <h2 className={styles.playlistTitle}>Playlists</h2>
            <div className={styles.playlistInputBar}>
                <CreatePlaylist/>
                <div className={styles.searchInput_container}>
                    <input
                        className={styles.searchInput}
                        placeholder={'Search Playlists'}
                        onKeyUp={handleSearch}
                    />
                </div>
            </div>
            {!filteredPlaylists.length
                ? <PlaylistThumbs
                    playlists={playlists}
                    handlePlaylistChange={handlePlaylistChange}
                />
                : <FoundPlaylists
                    filteredPlaylists={filteredPlaylists}
                    handlePlaylistChange={handlePlaylistChange}
                />}
        </div>
    );
};

export default Playlists;
