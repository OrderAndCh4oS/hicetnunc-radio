import useTitle from '../../hooks/use-title';
import TrackList from '../../components/track-list/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect } from 'react';
import { gql, request } from 'graphql-request';
import usePlaylist from '../../hooks/use-playlist';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            _and: {
                token_holders: {
                    quantity: {_gt: "0"},
                    _and: {_not: {holder_id: {_eq: "tz1burnburnburnburnburnburnburjAYjjX"}}}
                }
            }
        }) {
            id
            display_uri
            level
            description
            title
            token_holders {
                holder_id
                quantity
            }
            thumbnail_uri
            mime
            creator_id
            artifact_uri
        }
    }
`;

const AllTracksView = () => {
    useTitle(`H=N Radio Tracks`);
    const {
        audio,
        playerState,
        setPlayerState,
        controls,
        isTrackPlaying,
    } = useRadio();
    const {tracks, setTracks, creatorMetadata} = usePlaylist();

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
        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            setTracks(data?.hic_et_nunc_token?.map(o => ({
                id: o.id,
                creator: o.creator_id,
                name: o.title,
                src: `https://cloudflare-ipfs.com/ipfs/${o.artifact_uri.slice(7)}`,
                mimeType: o.mime,
            })));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

export default AllTracksView;


