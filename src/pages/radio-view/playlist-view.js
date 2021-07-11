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

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);

    const search = useLocation().search;
    const objktIdsStr = new URLSearchParams(search).get("objktIds");
    const objktIds = objktIdsStr?.split(',');
    const { setTracks } = usePlaylist();

    useEffect(() => {

        if (objktIds) {
            const objktList = objktIds.map((obj) => (`{id: {_eq: ${obj}}}`)).join(',')
            const query = gql`
                         query AudioObjktData {
                             hic_et_nunc_token(where: {_or: [${objktList}]}) {
                                 id
                                 artifact_uri
                                 creator_id
                                 description
                                 display_uri
                               }
                         }
             `;

            (async () => {

                const data = await request('https://api.hicdex.com/v1/graphql', query);

                const tokens = data?.hic_et_nunc_token;

                //sort the result to be in the same order as the in the url
                tokens.sort((a, b) => objktIds.indexOf(String(a.id)) - objktIds.indexOf(String(b.id)))

                setTracks(tokens.map(o => ({
                    id: o.id,
                    creator: o.creator_id,
                    name: o.title,
                    src: `${ipfsUrls[~~(Math.random() * ipfsUrls.length)]}/${o.artifact_uri.slice(7)}`,
                    mimeType: o.mime,
                    displayUri: o.display_uri,
                })));
            })();

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const handlePlaylistChange = (playlist) => () => setSelectedPlaylist(playlist);

    return (
        <>
            {!objktIds && <CurrentPlaylist playlist={selectedPlaylist} />}
            <PlaylistTracks playlist={selectedPlaylist} />
            <Playlists
                handlePlaylistChange={handlePlaylistChange}
                playlists={playlists}
            />
        </>
    );
};

export default PlaylistView;


