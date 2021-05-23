import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import getObjktsByWalletId from '../../api/get-objkts-by-wallet-id';
import RadioPlayer from '../../components/radio-player/radio-player';
import { defaultWalletId } from '../../constants';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer/footer';
import useTitle from '../../hooks/use-title';

const audioMimeTypes = ['audio/ogg', 'audio/mpeg', 'audio/wav'];

const RadioView = () => {
    const {tz} = useParams();
    useTitle(`H=N Radio ${tz ? `| ${tz}` : ''}`);
    const history = useHistory();
    const [objktData, setObjktData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [walletIdInput, setWalletIdInput] = useState('');
    const [walletId, setWalletId] = useState(tz || defaultWalletId);

    useEffect(() => {
        (async() => {
            const response = await getObjktsByWalletId(walletId);
            setIsLoading(false);
            setObjktData(response.data);
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
            <div className={styles.walletIdEntry}>
                <input
                    value={walletIdInput}
                    placeholder={'Enter a wallet id'}
                    onChange={handleWalletIDChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                >Get Tracks
                </button>
            </div>
            {isLoading ? <p>Loading...</p> : <RadioPlayer
                audioObjkts={filterAudio(objktData.result)}
                walletId={walletId}
            />}
            <Footer/>
        </div>
    );
};

export default RadioView;
