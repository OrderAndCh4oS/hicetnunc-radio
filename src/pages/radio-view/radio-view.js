import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import getObjktsByWalletId from '../../api/get-objkts-by-wallet-id';
import RadioPlayer from '../../components/radio-player';

const audioMimeTypes = ['audio/ogg', 'audio/mpeg', 'audio/wav'];

const RadioView = () => {
    const [objktData, setObjktData] = useState(null);
    const [walletIdInput, setWalletIdInput] = useState('');
    const [walletId, setWalletId] = useState('tz2R9EzXYHT93EuBkuquC6ib2cJQWJy486EL');

    useEffect(() => {
        (async() => {
            const response = await getObjktsByWalletId(walletId);
            console.log(response);
            setObjktData(response.data);
        })();
    }, [walletId]);

    useEffect(() => {
        console.log(walletId);
    }, [walletId]);

    const handleWalletIDChange = (event) => {
        setWalletId(event.target.value);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
    };

    const filterAudio = (objkts) =>
        objkts.filter(o => audioMimeTypes.includes(o.token_info.formats[0].mimeType));

    if(!objktData) return <p>Loading...</p>;

    return (
        <div className={styles.radioView}>
            <div className={styles.walletIdEntry}>
                <input value={walletIdInput} onChange={handleWalletIDChange}/>
                <button onClick={handleGetTracks}>Get Tracks</button>
            </div>
            <RadioPlayer audioObjkts={filterAudio(objktData.result)}/>
        </div>
    );
};

export default RadioView;
