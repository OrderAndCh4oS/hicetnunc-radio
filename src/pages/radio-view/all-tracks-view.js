import useTitle from '../../hooks/use-title';
import RadioPlayer from '../../components/radio-player/radio-player';
import TrackList from '../../components/track-list/track-list';
import useRadio from '../../hooks/use-radio';
import { useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../../api/get-user-metadata-by-wallet-id';
import { gql, request } from 'graphql-request';

const query = gql`
    query AudioObjktData {
        hic_et_nunc_token(where: {mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]}}) {
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

    const [tracks, setTracks] = useState(null);
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
        (async() => {
            const data = await request('https://api.hicdex.com/v1/graphql', query);
            console.log(data);
            setTracks(data?.hic_et_nunc_token?.map(o => ({
                id: o.id,
                creator: o.creator_id,
                name: o.title,
                src: `https://cloudflare-ipfs.com/ipfs/${o.artifact_uri.slice(7)}`,
                mimeType: o.mime,
            })));
        })();
    }, []);

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
    }, [tracks]);

    if(!tracks) return <p>Loading...</p>;

    return (
        <>
            <RadioPlayer tracks={tracks}/>
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


