import styles from './styles.module.css';
import { useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';
import Playlists from '../../components/playlists/playlists';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            <p className={styles.currentPlaylistText}>Playlist: {selectedPlaylist.name}</p>
            <PlaylistPlayer playlist={selectedPlaylist}/>
            <Playlists handlePlaylistChange={handlePlaylistChange}/>
        </>
    );
};

export default PlaylistView;


