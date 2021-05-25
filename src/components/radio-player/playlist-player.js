import { useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import TrackList from '../track-list/track-list';
import useRadio from '../../hooks/use-radio';
import RadioPlayer from './radio-player';

const PlaylistPlayer = ({playlist}) => {
    const {
        audio,
        playerState,
        setPlayerState,
        controls,
        isTrackPlaying,
    } = useRadio();

    const [creatorMetadata, setCreatorMetadata] = useState({});

    audio.onended = () => {
        if(!playlist.tracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (playerState.currentTrackKey + 1) % playlist.tracks.length;
        audio.src = playlist.tracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: playlist.tracks[nextTrackKey].id,
        }));
    };

    useEffect(() => {
        if(!playlist.tracks?.length || !audio) return;
        if(audio.src) return;
        audio.crossOrigin = 'anonymous';
        audio.src = playlist.tracks[0].src;
        audio.volume = playerState.volume;
        audio.mimeType = playlist.tracks[0].mimeType;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [playlist.tracks]);

    useEffect(() => {
        if(!playlist.tracks) return;
        (async() => {
            const uniqueCreatorWalletIds = new Set(playlist.tracks.map(t => t.creator));
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

    if(!playlist.tracks) return <p>Loading...</p>;

    return (
        <>
            <RadioPlayer tracks={playlist.tracks}/>
            <TrackList
                tracks={playlist.tracks}
                isTrackPlaying={isTrackPlaying}
                handlePause={controls.pause}
                handleSelectTrack={controls.selectTrack(playlist.tracks)}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default PlaylistPlayer;
