import styles from './styles.module.css';
import { useEffect, useState } from 'react';
import getObjktsByWalletId from '../../api/get-objkts-by-wallet-id';
import RadioPlayer from '../../components/radio-player/radio-player';
import { defaultWalletId } from '../../constants';
import { useHistory, useParams } from 'react-router';
import Footer from '../../components/footer/footer';

const audioMimeTypes = ['audio/ogg', 'audio/mpeg', 'audio/wav'];

const RadioView = () => {
    const {tz} = useParams();
    console.log('tz', tz);
    const history = useHistory();
    const [objktData, setObjktData] = useState(null);
    const [walletIdInput, setWalletIdInput] = useState('');
    const [walletId, setWalletId] = useState(tz || defaultWalletId);

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
        setWalletIdInput(event.target.value);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
        history.push(`/tz/${walletIdInput}`)
    };

    const filterAudio = (objkts) =>
        objkts.filter(o => audioMimeTypes.includes(o.token_info.formats[0].mimeType));

    if(!objktData) return  <div className={styles.radioView}><p>Loading...</p></div>;

    return (
        <div className={styles.radioView}>
            <div className={styles.walletIdEntry}>
                <input
                    value={walletIdInput}
                    onChange={handleWalletIDChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                >Get Tracks</button>
            </div>
            <RadioPlayer audioObjkts={filterAudio(objktData.result)}/>
            <Footer/>
        </div>
    );
};

export default RadioView;
