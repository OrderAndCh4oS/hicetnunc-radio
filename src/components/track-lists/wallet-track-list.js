import { useEffect, useState } from 'react';
import TrackList from './track-list';
import FilterTypes from '../../enums/filter-types';
import TracksFilterBar from './tracks-filter-bar';
import useRadio from '../../hooks/use-radio';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';

const WalletTrackList = ({audioObjkts, walletId}) => {
    const {
        audio,
        playerState,
        setPlayerState,
        controls,
        isTrackPlaying,
    } = useRadio();

    const {tracks, setTracks, creatorMetadata} = usePlaylist();

    const [filteredTracks, setFilteredTracks] = useState([]);
    const [filter, setFilter] = useState(FilterTypes.ALL);

    audio.onended = () => {
        if(!filteredTracks.length) return;
        // Todo: Somehow find the next track to play and start playing it.
        const nextTrackKey = (playerState.currentTrackKey + 1) % filteredTracks.length;
        audio.src = filteredTracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentTrack: filteredTracks[nextTrackKey],
        }));
    };

    useEffect(() => {
        setTracks(audioObjkts.map(o => ({
            id: o.token_id,
            creator: o.token_info.creators[0],
            name: o.token_info.name,
            src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.token_info.artifactUri.slice(7)}`,
            mimeType: o.token_info.formats[0].mimeType,
            displayUri: o.display_uri,
        })));
    }, [audioObjkts, setTracks]);

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
