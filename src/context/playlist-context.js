import { createContext, useEffect, useState } from 'react';
import getUserMetadataByWalletId from '../api/get-user-metadata-by-wallet-id';

export const PlaylistContext = createContext(null);

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);
    const [creatorMetadata, setCreatorMetadata] = useState({});

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

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                setTracks,
                creatorMetadata,
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

