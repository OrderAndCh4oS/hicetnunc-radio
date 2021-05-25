import { useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import TrackList from '../track-list/track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from '../track-list/tracks-filter-bar';
import useRadio from '../../hooks/use-radio';
import RadioPlayer from './radio-player';

const WalletPlayer = ({audioObjkts, walletId}) => {
    const {
        audio,
        playerState,
        setPlayerState,
        controls,
        isTrackPlaying,
    } = useRadio();

    const [tracks, setTracks] = useState(null);
    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);
    const [creatorMetadata, setCreatorMetadata] = useState({});

    audio.onended = () => {
        if(!filteredTracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (playerState.currentTrackKey + 1) % filteredTracks.length;
        audio.src = filteredTracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentId: filteredTracks[nextTrackKey].id,
        }));
    };

    useEffect(() => {
        setTracks(audioObjkts.map(o => ({
            id: o.token_id,
            creator: o.token_info.creators[0],
            name: o.token_info.name,
            src: `https://cloudflare-ipfs.com/ipfs/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
        })));
    }, [audioObjkts]);

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
        setFilteredTracks(tracks.filter(t => {
            switch(filter) {
                case FilterTypes.ALL:
                    return true;
                case FilterTypes.CREATIONS:
                    return t.creator === walletId;
                case FilterTypes.COLLECTIONS:
                    return t.creator !== walletId;
                default:
                    return true;
            }
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks, filter]);

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
    }, [tracks, filter]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <RadioPlayer tracks={filteredTracks}/>
            <TracksFilterBar filter={filter} setFilter={setFilter}/>
            <TrackList
                tracks={filteredTracks}
                isTrackPlaying={isTrackPlaying}
                handlePause={controls.pause}
                handleSelectTrack={controls.selectTrack(filteredTracks)}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default WalletPlayer;
