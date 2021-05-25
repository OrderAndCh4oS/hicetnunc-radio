import styles from './styles.module.css';
import { useState } from 'react';
import WalletPlayer from '../../components/radio-player/radio-player';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer/footer';
import useTitle from '../../hooks/use-title';
import Logo from '../../components/logo/logo';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';

const PlaylistView = () => {
    const {slug} = useParams();
    const history = useHistory();
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [objktData, setObjktData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useTitle(`H=N Radio Playlists`);

    const handlePlaylistChange = (event) => {
        setSelectedPlaylist(event.target.data)
    };

    return (
        <div className={styles.radioView}>
            <div className={styles.headerBar}>
                <Logo/>
            </div>
            <div className={styles.walletIdEntry}>
                <select
                    className={styles.selectPlaylist}
                    onChange={handlePlaylistChange}
                >
                    {playlists.map(p => <option key={p.id} value={p}>{p.name}</option>)}
                </select>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            {objktData ? (
                <>
                    {isLoading ? <p>Loading...</p> : <PlaylistPlayer
                        playlist={selectedPlaylist}
                    />}
                </>
            ) : (<>{isLoading ? <p>Loading...</p> : null}</>)}
            <Footer/>
        </div>
    );
};

export default PlaylistView;
