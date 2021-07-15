import { useEffect } from 'react';
import TrackList from '../track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';

const PlaylistTracks = ({playlist}) => {
    const {
        audio,
        playerState,
        controls,
        isTrackPlaying,
    } = useRadio();
    const {filteredTracks, setFilteredTracks, creatorMetadata} = usePlaylist();

    useEffect(() => {
        setFilteredTracks(playlist.tracks);
    }, [playlist, setFilteredTracks]);

    audio.onended = () => {
        if(!filteredTracks.length) return;
        const nextTrackKey = (playerState.currentTrackKey + 1) % filteredTracks.length;
        controls.selectTrack(filteredTracks)(nextTrackKey)();
    };

    useEffect(() => {
        if(!filteredTracks?.length || !audio) return;
        if(audio.src) return;
        controls.initialiseTrack(filteredTracks)(0)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredTracks]);

    if(!filteredTracks) return <p>Loading...</p>;

    return (
        <TrackList
            tracks={filteredTracks}
            isTrackPlaying={isTrackPlaying}
            creatorMetadata={creatorMetadata}
            playlist={playlist}
        />
    );
};

export default PlaylistTracks;
