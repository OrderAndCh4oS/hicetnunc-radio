import { createRef, useEffect, useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists as initialPlaylists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';
import Playlists from '../../components/playlists/playlists';
import CurrentPlaylist from '../../components/current-playlist/current-playlist';
import useUserPlaylists from '../../hooks/use-user-playlists';
import styles from './styles.module.css';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const {userPlaylists, createUserPlaylist} = useUserPlaylists();

    const [playlists, setPlaylists] = useState(initialPlaylists);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const createPlaylistRef = createRef();

    useEffect(() => {
        setPlaylists([...userPlaylists, ...initialPlaylists]);
    }, [userPlaylists]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    const handleCreatePlaylist = () => {
        if(!createPlaylistRef.current) return;
        if(!createPlaylistRef.current.value) alert('Enter a playlist name');
        createUserPlaylist(createPlaylistRef.current.value);
        createPlaylistRef.current.value = '';
    };

    return (
        <>
            <CurrentPlaylist playlist={selectedPlaylist}/>
            <PlaylistPlayer playlist={selectedPlaylist}/>
            <Playlists handlePlaylistChange={handlePlaylistChange} playlists={playlists}/>
            <div className={styles.createPlaylist_form}>
                <label className={styles.createPlaylist_label} htmlFor='create-playlist'>Create Playlist</label>
                <input className={styles.createPlaylist_input} id='create-playlist' ref={createPlaylistRef}/>
                <button className={styles.createPlaylist_button} onClick={handleCreatePlaylist}>Create</button>
            </div>
        </>
    );
};

export default PlaylistView;


