import { useEffect, useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists as initialPlaylists } from '../../playlists/playlists';
import PlaylistTracks from '../../components/radio-player/playlist-tracks';
import Playlists from '../../components/playlists/playlists';
import CurrentPlaylist from '../../components/current-playlist/current-playlist';
import useUserPlaylists from '../../hooks/use-user-playlists';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const {userPlaylists} = useUserPlaylists();

    const [playlists, setPlaylists] = useState(initialPlaylists);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    useEffect(() => {
        const nextPlaylists = [...userPlaylists, ...initialPlaylists];
        setPlaylists(nextPlaylists);
    }, [userPlaylists]);

    useEffect(() => {
        setSelectedPlaylist(prevState => {
            const sp = playlists.find(np => prevState.name === np.name) || playlists[0];
            return {...sp, forceUpdate: (sp?.forceUpdate || 0) + 1}; // Todo: Remove the need for forceUpdate
        });
    }, [playlists]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            <CurrentPlaylist playlist={selectedPlaylist}/>
            <PlaylistTracks playlist={selectedPlaylist}/>
            <Playlists
                handlePlaylistChange={handlePlaylistChange}
                playlists={playlists}
            />
        </>
    );
};

export default PlaylistView;


