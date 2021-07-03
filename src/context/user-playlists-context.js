import { createContext, useState, useEffect } from 'react';
import setLocalStorage from '../utilities/set-local-storage';

export const UserPlaylistsContext = createContext({});

const UserPlaylistProvider = ({children}) => {
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        const storedPlaylist = window.localStorage.getItem('user-playlists');
        if(!storedPlaylist) return;
        const initialPlaylists = JSON.parse(storedPlaylist);
        setUserPlaylists(initialPlaylists);
    }, []);

    const createUserPlaylist = (name) => {
        setUserPlaylists(prevState => setLocalStorage('user-playlists', [
            ...prevState,
            {
                name,
                curator: 'Mine',
                description: '',
                tracks: [],
            },
        ]));
    };

    const addTrack = (playlistName, track) => {
        console.log('t', track);
        setUserPlaylists(prevState => {
            const nextPlaylists = [];
            while(prevState.length) {
                const playlist = prevState.shift();
                nextPlaylists.push(playlist);
                if(playlist.name === playlistName) {
                    playlist.tracks.push(track);
                    break;
                }
            }
            return setLocalStorage('user-playlists', [...nextPlaylists, ...prevState]);
        });
    };

    const removeTrack = (playlistName, track) => {
        setUserPlaylists(prevState => {
            const nextPlaylists = [];
            while(prevState.length) {
                const playlist = prevState.shift();
                nextPlaylists.push(playlist);
                if(playlist.name === playlistName) {
                    playlist.tracks = playlist.tracks.filter(t => t.name !== track.name);
                    break;
                }
            }
            return setLocalStorage('user-playlists', [...nextPlaylists, ...prevState]);
        });
    };

    return (
        <UserPlaylistsContext.Provider
            value={{
                userPlaylists,
                createUserPlaylist,
                addTrack,
                removeTrack,
            }}
        >
            {children}
        </UserPlaylistsContext.Provider>
    );
};

export default UserPlaylistProvider;

