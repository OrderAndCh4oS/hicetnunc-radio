import { createContext, useState } from 'react';

export const PlaylistContext = createContext({audioRef: null});

const PlaylistProvider = ({children}) => {
    const [tracks, setTracks] = useState([]);

    return (
        <PlaylistContext.Provider
            value={{
                tracks,
                setTracks
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistProvider;

