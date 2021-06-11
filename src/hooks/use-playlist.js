import { useContext } from 'react';
import { PlaylistContext } from '../context/playlist-context';

const usePlaylist = () => useContext(PlaylistContext);

export default usePlaylist;
