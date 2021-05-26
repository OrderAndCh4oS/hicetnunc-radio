import styles from './styles.module.css';
import { useState } from 'react';
import useTitle from '../../hooks/use-title';
import { playlists } from '../../playlists/playlists';
import PlaylistPlayer from '../../components/radio-player/playlist-player';

const PlaylistView = () => {
    useTitle(`H=N Radio Playlists`);
    const [selectedPlaylist, setSelectedPlaylist] = useState(playlists[0]);

    const handlePlaylistChange = (event) => setSelectedPlaylist(event.target.data);

    return (
        <>
            <div className={styles.walletIdEntry}>
                <select
                    className={styles.selectPlaylist}
                    onChange={handlePlaylistChange}
                >
                    {playlists.map(p => <option key={p.name} value={p}>{p.name}</option>)}
                </select>
            </div>
            <PlaylistPlayer playlist={selectedPlaylist}/>


    {/* Here starts the squared More Playlists component*/}

         {/* Wraps the whole component and define it's margins*/}
        <div className={styles.MorePlaylists}>

            {/*Title*/}
            <h4 className={styles.morePlaylistsTitle}>More Playlists</h4>

                {/*Defines the grid rules*/}
                <div className={styles.boxPlaylists}>

                    {/* 1/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists1}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>whatifthenameiswaytoolongfortheboxandhasnospaces</p>
                            </a>
                        </div>
                    </div>

                    {/* 2/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists2}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                    {/* 3/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists3}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                    {/* 4/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists4}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                    {/* 5/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists5}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                    {/* 6/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists6}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                    {/* 7/7 individual block of the gid*/}
                    <div className={styles.boxPlaylists7}>
                        <div className={styles.boxImage}>
                            <a href="https://www.hicetnunc.xyz/">
                                <img src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/modern-art-square-edward-fielding.jpg" 
                                className={styles.boxImage2}></img>
                                <p className={styles.boxText1}>Playlist</p>
                            </a>
                        </div>
                    </div>

                </div>
        </div>   
         {/*Here it ends
         but the dreams will never fade*/} 
         
        </>
    );
};

export default PlaylistView;


