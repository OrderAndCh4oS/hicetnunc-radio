import { useEffect } from 'react';
import TrackList from '../track-list/track-list';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';

const PlaylistPlayer = ({playlist}) => {
    const {
        audio,
        playerState,
        setPlayerState,
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
        audio.src = tracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentTrack: tracks[nextTrackKey],
        }));
    };

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <TrackList
                tracks={tracks}
                isTrackPlaying={isTrackPlaying}
                handlePause={controls.pause}
                handleSelectTrack={controls.selectTrack(tracks)}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default PlaylistPlayer;
