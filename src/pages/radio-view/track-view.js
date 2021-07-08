import useTitle from '../../hooks/use-title';
import TrackList from '../../components/track-lists/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect } from 'react';
import { gql, request } from 'graphql-request';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';
import { useParams } from 'react-router';

const TrackView = () => {
    const {objkt} = useParams();
    useTitle(`H=N Radio`);
    const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {id: {_eq: "${objkt}"}}) {
          display_uri
          description
          creator_id
          thumbnail_uri
          title
          artifact_uri
          mime
          id
        }
      }
`;
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
        const nextTrackKey = (playerState.currentTrackKey + 1) % tracks.length;
        audio.src = tracks[nextTrackKey].src;
        controls.play();
        setPlayerState(prevState => ({
            ...prevState,
            currentTrackKey: nextTrackKey,
            currentTrack: tracks[nextTrackKey],
        }));
    };

    useEffect(() => {
        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            console.log(data);
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

export default TrackView;


