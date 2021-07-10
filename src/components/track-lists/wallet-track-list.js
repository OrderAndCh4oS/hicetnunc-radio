import { useEffect, useState } from 'react';
import TrackList from './track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from './tracks-filter-bar';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';
import useWallet from '../../hooks/use-wallet';

const WalletTrackList = () => {
    const {
        audio,
        playerState,
        controls,
        isTrackPlaying,
    } = useRadio();
    const {objkts, walletId} = useWallet();

    const {tracks, setTracks, creatorMetadata} = usePlaylist();

    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);

    audio.onended = () => {
        if(!filteredTracks.length) return;
        const nextTrackKey = (playerState.currentTrackKey + 1) % filteredTracks.length;
        controls.initialiseTrack(filteredTracks)(nextTrackKey)();
    };

    useEffect(() => {
        setTracks(objkts.map(o => ({
            id: o.id,
            creator: o.creator_id,
            name: o.title,
            src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
            mimeType: o.mime,
            displayUri: o.display_uri,
        })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [objkts]);

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

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <TracksFilterBar filter={filter} setFilter={setFilter}/>
            <TrackList
                tracks={filteredTracks}
                isTrackPlaying={isTrackPlaying}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default WalletTrackList;
