import { useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';
import Playlists from '../../components/playlists/playlists';
import CurrentPlaylist from '../../components/current-playlist/current-playlist';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            <CurrentPlaylist playlist={selectedPlaylist}/>
            <PlaylistPlayer playlist={selectedPlaylist}/>
            <Playlists handlePlaylistChange={handlePlaylistChange}/>
        </>
    );
};

export default PlaylistView;


