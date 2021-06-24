import styles from './styles.module.css';
import PauseIcon from '../radio-player/pause-icon';
import PlayIcon from '../radio-player/play-icon';
import { getAlias, getCreator } from '../../utilities/general';
import AddToPlaylist from '../add-to-playlist/add-to-playlist';
import RemoveFromPlaylist from '../add-to-playlist/remove-from-playlist';
import useRadio from '../../hooks/use-radio';
import ipfsClient from 'ipfs-http-client';

// converts an ipfs hash to ipfs url
const HashToURL = (hash, type) => {
    // when on preview the hash might be undefined.
    // its safe to return empty string as whatever called HashToURL is not going to be used
    // artifactUri or displayUri
    if (hash === undefined) {
      return ''
    }
  
    switch (type) {
      case 'CLOUDFLARE':
        return hash.replace('ipfs://', 'https://cloudflare-ipfs.com/ipfs/')
      case 'PINATA':
        return hash.replace('ipfs://', 'https://gateway.pinata.cloud/ipfs/')
      case 'IPFS':
        return hash.replace('ipfs://', 'https://ipfs.io/ipfs/')
      case 'INFURA':
        var cidv1 = new ipfsClient.CID(hash.replace('ipfs://', '')).toV1()
        var subdomain = cidv1.toBaseEncodedString('base32')
        return `https://${subdomain}.ipfs.infura-ipfs.io/`
      default:
        console.error('please specify type')
        return hash
    }
  }

const TrackList = ({
    tracks,
    isTrackPlaying,
    creatorMetadata,
    playlist,
}) => {

    const {controls} = useRadio()
    const handleSelectTrack = controls.selectTrack(tracks);
    return <>
        {!tracks.length ? <p>No audio tracks available</p> : (
            <div>
                {tracks.map((t, i) =>{
                    console.log(t.displayUri);
                    return <div key={t.id} className={styles.trackRow}>
                        {isTrackPlaying(t.id)
                            ? (
                                <button
                                    className={`${styles.button} ${styles.button_pause_small} ${styles.button_playerControl_small}`}
                                    onClick={controls.pause}
                                ><PauseIcon/></button>
                            ) : (
                                <button
                                    className={`${styles.button} ${styles.button_play_small} ${styles.button_playerControl_small}`}
                                    onClick={handleSelectTrack(i)}
                                ><PlayIcon/></button>
                            )}
                        {
                            playlist?.curator === 'Mine'
                                ? <RemoveFromPlaylist
                                    playlistName={playlist.name}
                                    track={t}
                                />
                                : <AddToPlaylist track={t}/>
                        }
                        <span className={styles.trackRow_text}>
                        <img src={HashToURL(t.displayUri,'CLOUDFLARE')} alt="album cover" />
                            <a
                                href={`https://hicetnunc.xyz/objkt/${t.id}`}
                                className={styles.trackRow_link}
                            >#{t.id} {t.name}</a>
                            <br/>
                            By <a
                            href={`https://hicetnunc.xyz/tz/${t.creator}`}
                            className={styles.trackRow_link}
                        >
                            {getCreator(t.creator)} {getAlias(t, creatorMetadata)}
                        </a>
                                </span>
                        <img
                            alt={'Artist\'s avatar'}
                            className={styles.trackRow_avatar}
                            src={`https://services.tzkt.io/v1/avatars2/${t.creator}`}
                        />
                    </div>
                })}
            </div>
        )}
    </>;
};

export default TrackList;
