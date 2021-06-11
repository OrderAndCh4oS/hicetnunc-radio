import { useState } from 'react';
import useUserPlaylists from '../../hooks/use-user-playlists';
import styles from './styles.module.css';

const AddToPlaylist = ({track}) => {
    const {addTrack, userPlaylists} = useUserPlaylists();
    const [showList, setShowList] = useState(false);

    const toggleAddToPlaylist = () => {
        setShowList(prevState => !prevState);
    };

    const handleAddTrack = (name) => () => {
        if(!track) return;
        addTrack(name, track);
        setShowList(false);
    };

    return (
        <div className={styles.addToPlaylist_container}>
            <button
                onClick={toggleAddToPlaylist}
                className={styles.addToPlaylist_addToggle}
                title='Add to Playlist'
            >{!showList ? '+' : '×'}</button>
            {showList ? <div className={styles.addToPlaylist_list}>
                {userPlaylists.length
                    ? userPlaylists.map(up => (
                        <button
                            className={styles.addToPlaylist_button}
                            onClick={handleAddTrack(up.name)}
                        >{up.name}</button>
                    ))
                    : <p>No Playlists</p>}
            </div> : null}
        </div>
    );
};

export default AddToPlaylist;
