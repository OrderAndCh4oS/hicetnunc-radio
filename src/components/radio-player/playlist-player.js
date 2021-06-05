import { useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
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
    const {tracks, setTracks} = usePlaylist();

    useEffect(() => {
        setTracks(playlist.tracks);
    }, [playlist, setTracks]);

    const [creatorMetadata, setCreatorMetadata] = useState({});

    audio.onended = () => {
        if(!tracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (playerState.currentTrackKey + 1) % tracks.length;
        audio.src = tracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: tracks[nextTrackKey].id,
        }));
    };

    useEffect(() => {
        if(!tracks?.length || !audio) return;
        if(audio.src) return;
        audio.crossOrigin = 'anonymous';
        audio.src = tracks[0].src;
        audio.volume = playerState.volume;
        audio.mimeType = tracks[0].mimeType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    useEffect(() => {
        if(!tracks) return;
        (async() => {
            const uniqueCreatorWalletIds = new Set(tracks.map(t => t.creator));
            const nextCreatorMetadata = (await Promise.allSettled(
                [...uniqueCreatorWalletIds]
                    .map(id => getUserMetadataByWalletId(id)),
            ))
                .filter(res => res.status === 'fulfilled')
                .reduce((obj, res) => {
                    try {
                        const walletId = res.value.data.logo.split('.')[0];
                        obj[walletId] = res.value.data;
                    } catch(e) {
                        console.warn('Error fetching metadata:', e);
                    }
                    return obj;
                }, {});
            setCreatorMetadata(nextCreatorMetadata);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playlist]);

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
