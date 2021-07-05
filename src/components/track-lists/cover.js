import { getAlias, getCreator } from '../../utilities/general';
import { playlistDefault } from '../../assets/images';
import { ipfsUrls } from '../../constants';

const Cover = ({
    track,
}) => {
    const coverHash = track?.displayUri?.slice(7) || '';
    const srcSet = ipfsUrls.map((url) => `${url}/${coverHash}`).join(', ');
return <>
<div key={track.id}>

                        <span>
                            <img src={track?.displayUri ? `https://cloudflare-ipfs.com/ipfs/${track.displayUri.slice(7)}` : playlistDefault}
                                srcSet={track?.displayUri ? srcSet : playlistDefault}
                                alt=""
                            />
    
                            By <a
                                href={`https://hicetnunc.xyz/tz/${track.creator}`}

                            >
                               
                            </a>
                        </span>
                        <img
                            alt={'Artist\'s avatar'}
                            src={`https://services.tzkt.io/v1/avatars2/${track.creator}`}
                        />
                    </div>
                        </>;
}
export default Cover;