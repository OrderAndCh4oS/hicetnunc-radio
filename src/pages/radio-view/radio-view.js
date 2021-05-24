import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import getObjktsByWalletId from '../../api/get-objkts-by-wallet-id';
import RadioPlayer from '../../components/radio-player/radio-player';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer/footer';
import useTitle from '../../hooks/use-title';
import Logo from '../../components/logo/logo';
import { playlists } from '../../playlists/playlists';

const audioMimeTypes = ['audio/ogg', 'audio/mpeg', 'audio/wav'];

const RadioView = () => {
    const {tz} = useParams();
    useTitle(`H=N Radio ${tz ? `| ${tz}` : ''}`);
    const history = useHistory();
    const [objktData, setObjktData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [walletIdInput, setWalletIdInput] = useState('');
    const [walletId, setWalletId] = useState(tz || playlists[0].walletAddress);

    useEffect(() => {
        (async() => {
            const response = await getObjktsByWalletId(walletId);
            setIsLoading(false);
            setObjktData(filterAudio(response?.data?.result || []));
        })();
    }, [walletId]);

    const handleWalletIDChange = (event) => {
        setWalletIdInput(event.target.value);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
        setIsLoading(true);
        history.push(`/tz/${walletIdInput}`);
    };

    const filterAudio = (objkts) =>
        objkts.filter(o => audioMimeTypes.includes(o.token_info.formats[0].mimeType));

    if(!objktData) return <div className={styles.radioView}><p>Loading...</p></div>;

    return (
        <div className={styles.radioView}>
            <div className={styles.headerBar}>
                <Logo/>
                <select
                    className={styles.selectPlaylist}
                    onChange={handleWalletIDChange}
                >
                    {playlists.map(p => <option key={p.walletAddress} value={p.walletAddress}>{p.name}</option>)}
                </select>
            </div>
            <div className={styles.walletIdEntry}>
                <input
                    className={styles.walletInput}
                    value={walletIdInput}
                    placeholder={'Enter a wallet id'}
                    onChange={handleWalletIDChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                    disabled={!walletIdInput}
                >Get Tracks
                </button>
            </div>
            {isLoading ? <p>Loading...</p> : <RadioPlayer
                audioObjkts={objktData}
                walletId={walletId}
            />}
            <Footer/>
        </div>
    );
};

export default RadioView;
