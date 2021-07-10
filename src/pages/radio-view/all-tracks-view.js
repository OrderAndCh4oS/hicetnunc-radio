import useTitle from '../../hooks/use-title';
import TrackList from '../../components/track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect } from 'react';
import { gql, request } from 'graphql-request';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';
import { useParams } from 'react-router';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }, order_by: {id: desc}) {
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
    const {objkt} = useParams();
    useTitle(`H=N Radio Tracks`);
    const {
        audio,
        playerState,
        controls,
        isTrackPlaying,
    } = useRadio();
    const {tracks, setTracks, creatorMetadata} = usePlaylist();

    audio.onended = () => {
        if(!tracks.length) return;
        const nextTrackKey = (playerState.currentTrackKey + 1) % tracks.length;
        controls.selectTrack(tracks)(nextTrackKey)();
    };

    useEffect(() => {
        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            setTracks(data?.hic_et_nunc_token?.map(o => ({
                id: o.id,
                creator: o.creator_id,
                name: o.title,
                src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
                mimeType: o.mime,
                displayUri: o.display_uri,
            })));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!tracks?.length || !audio) return;
        if(audio.src) return;
        const foundIndex = tracks.findIndex(t => t.id === Number(objkt));
        controls.initialiseTrack(tracks)(foundIndex !== -1 ? foundIndex : 0)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <TrackList
                tracks={tracks}
                isTrackPlaying={isTrackPlaying}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default AllTracksView;


