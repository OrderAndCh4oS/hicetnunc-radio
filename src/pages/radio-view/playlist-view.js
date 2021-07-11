import { useEffect, useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists as initialPlaylists } from '../../playlists/playlists';
import PlaylistTracks from '../../components/radio-player/playlist-tracks';
import Playlists from '../../components/playlists/playlists';
import CurrentPlaylist from '../../components/current-playlist/current-playlist';
import useUserPlaylists from '../../hooks/use-user-playlists';
import { useLocation } from "react-router-dom";
import { gql, request } from 'graphql-request';
import usePlaylist from '../../hooks/use-playlist';
import { ipfsUrls } from '../../constants';

const query = gql`
    query AudioObjktData($objktIds: [bigint!]) {
        hic_et_nunc_token(where: {
            id: {_in: $objktIds},
            mime: {_in: ["audio/ogg", "audio/wav", "audio/mpeg"]},
            token_holders: {
                quantity: {_gt: "0"},
                holder_id: {_neq: "tz1burnburnburnburnburnburnburjAYjjX"}
            }
        }) {
            id
            artifact_uri
            creator_id
            description
            display_uri
        }
    }
`;

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);

    const search = useLocation().search;
    const objktIdsStr = new URLSearchParams(search).get("objkts");
    const objktIds = objktIdsStr?.split(',').map(id => Number(id));
    const { tracks, setTracks } = usePlaylist();


    useEffect(() => {
        if (isDeepLink) {
            (async () => {
                const response = await request('https://api.hicdex.com/v1/graphql', query, {objktIds});
                const trackList = response?.hic_et_nunc_token?.sort((a, b) => objktIds.indexOf(a.id) - objktIds.indexOf(b.id))
                setTracks(trackList.map(o => ({
                    id: o.id,
                    creator: o.creator_id,
                    name: o.title,
                    src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
                    mimeType: o.mime,
                    displayUri: o.display_uri,
                }))
                );
            })();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isDeepLink, setIsDeepLink] = useState(objktIds);
    const { userPlaylists } = useUserPlaylists();
    const [playlists, setPlaylists] = useState(initialPlaylists);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    useEffect(() => {

        const nextPlaylists = [...userPlaylists, ...initialPlaylists];
        setPlaylists(nextPlaylists);
    }, [userPlaylists]);

    useEffect(() => {
        setSelectedPlaylist(prevState => {
            const sp = playlists.find(np => prevState.name === np.name) || playlists[0];
            return { ...sp, forceUpdate: (sp?.forceUpdate || 0) + 1 }; // Todo: Remove the need for forceUpdate
        });
    }, [playlists]);

    const handlePlaylistChange = (playlist) => () => {
        setIsDeepLink(false);
        setSelectedPlaylist(playlist)
    };

    return (
        <>
            {!isDeepLink && <CurrentPlaylist playlist={selectedPlaylist} />}
            <PlaylistTracks tracklist={isDeepLink ? tracks : selectedPlaylist.tracks} />
            <Playlists
                handlePlaylistChange={handlePlaylistChange}
                playlists={playlists}
            />
        </>
    );
};

export default PlaylistView;


