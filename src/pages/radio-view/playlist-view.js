import styles from './styles.module.css';
import { useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistChange = (event) => setSelectedPlaylist(event.target.data);

    return (
        <>
            <div className={styles.walletIdEntry}>
                <select
                    className={styles.selectPlaylist}
                    onChange={handlePlaylistChange}
                >
                    {playlists.map(p => <option key={p.name} value={p}>{p.name}</option>)}
                </select>
            </div>
            <PlaylistPlayer playlist={selectedPlaylist}/>
        </>
    );
};

export default PlaylistView;
