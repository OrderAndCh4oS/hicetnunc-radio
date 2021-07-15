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
            token_tags {
                tag{tag}
              }
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
    const {filteredTracks, setFilteredTracks, creatorMetadata} = usePlaylist();
    audio.onended = () => {
        if(!filteredTracks.length) return;
        const nextTrackKey = (playerState.currentTrackKey + 1) % filteredTracks.length;
        controls.selectTrack(filteredTracks)(nextTrackKey)();
    };

    useEffect(() => {

        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            const allTracks = (data?.hic_et_nunc_token?.map(o => ({
                id: o.id,
                creator: o.creator_id,
                name: o.title,
                src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
                mimeType: o.mime,
                displayUri: o.display_uri,
                tags: o.token_tags,
            })));

            setFilteredTracks(allTracks);
            //Alltracks is to be able to reset after filtering by tag
            playerState.allTracks = allTracks;
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(!filteredTracks?.length || !audio) return;
        if(audio.src) return;
        const foundIndex = filteredTracks.findIndex(t => t.id === Number(objkt));
        controls.initialiseTrack(filteredTracks)(foundIndex !== -1 ? foundIndex : 0)();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredTracks]);

    if(!filteredTracks) return <p>Loading...</p>;

    return (
        <>
            <TrackList
                tracks={filteredTracks}
                setTracks={setFilteredTracks}
                isTrackPlaying={isTrackPlaying}
                creatorMetadata={creatorMetadata}
            />
        </>
    );
};

export default AllTracksView;


