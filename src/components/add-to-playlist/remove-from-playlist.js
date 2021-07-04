import useUserPlaylists from '../../hooks/use-user-playlists';
import styles from './styles.module.css';

const RemoveFromPlaylist = ({playlistName, track}) => {
    const {removeTrack} = useUserPlaylists();

    const handleRemoveTrack = () => {
        if(!track) return;
        removeTrack(playlistName, track);
    };

    return (
        <div className={styles.addToPlaylist_container}>
            <button
                onClick={handleRemoveTrack}
                className={styles.addToPlaylist_addToggle}
                title='Remove Track'
            >×
            </button>
        </div>
    );
};

export default RemoveFromPlaylist;
