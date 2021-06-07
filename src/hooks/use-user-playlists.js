import { useContext } from 'react';
import { UserPlaylistsContext } from '../context/user-playlists-context';

const useUserPlaylists = () => useContext(UserPlaylistsContext);

export default useUserPlaylists;
