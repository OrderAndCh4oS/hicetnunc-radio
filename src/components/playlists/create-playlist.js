import styles from './styles.module.css';
import useUserPlaylists from '../../hooks/use-user-playlists';
import { createRef } from 'react';

function CreatePlaylist() {
    const {createUserPlaylist} = useUserPlaylists();
    const createPlaylistRef = createRef();

    const handleCreatePlaylist = () => {
        if(!createPlaylistRef.current) return;
        if(!createPlaylistRef.current.value) alert('Enter a playlist name');
        createUserPlaylist(createPlaylistRef.current.value);
        createPlaylistRef.current.value = '';
    };

    return <div className={styles.createPlaylist_form}>
        <input
            className={styles.createPlaylist_input}
            id='create-playlist'
            ref={createPlaylistRef}
            title='Create Playlist'
            placeholder='Playlist Title'
        />
        <button
            className={styles.createPlaylist_button}
            onClick={handleCreatePlaylist}
        >Create Playlist
        </button>
    </div>;
}

export default CreatePlaylist;
