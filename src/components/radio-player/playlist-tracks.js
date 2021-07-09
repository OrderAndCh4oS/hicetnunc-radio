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
    const {tracks, setTracks, creatorMetadata} = usePlaylist();

    useEffect(() => {
        setTracks(playlist.tracks);
    }, [playlist, setTracks]);

    audio.onended = () => {
        if(!tracks.length) return;
        const nextTrackKey = (playerState.currentTrackKey + 1) % tracks.length;
        controls.selectTrack(tracks)(nextTrackKey)();
    };

    useEffect(() => {
        if(!tracks?.length || !audio) return;
        if(audio.src) return;
        controls.initialiseTrack(tracks)(0)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <TrackList
            tracks={tracks}
            isTrackPlaying={isTrackPlaying}
            creatorMetadata={creatorMetadata}
            playlist={playlist}
        />
    );
};

export default PlaylistTracks;
