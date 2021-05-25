import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import WalletPlayer from '../../components/radio-player/wallet-player';
import { useHistory, useParams } from 'react-router';
import useTitle from '../../hooks/use-title';
import useWallet from '../../hooks/use-wallet';

const WalletView = () => {
    const {tz} = useParams();
    const {walletId, setWalletId, objktData, isLoading, setIsLoading, error} = useWallet();
    useTitle(`H=N Radio ${walletId ? `| ${walletId}` : ''}`);
    useEffect(() => {
        if(!tz || tz === walletId) return;
        console.log('tz', tz);
        setWalletId(tz);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tz]);

    const history = useHistory();
    const [walletIdInput, setWalletIdInput] = useState('');

    const handleWalletIDChange = (event) => {
        setWalletIdInput(event.target.value);
    };

    const handleGetTracks = () => {
        setWalletId(walletIdInput);
        setWalletIdInput('');
        setIsLoading(true);
        history.push(`/tz/${walletIdInput}`);
    };
    return (
        <>
            <div className={styles.walletIdEntry}>
                <input
                    className={styles.walletInput}
                    value={walletIdInput}
                    placeholder={'Enter a wallet address'}
                    onChange={handleWalletIDChange}
                />
                <button
                    className={styles.button_getObjktData}
                    onClick={handleGetTracks}
                    disabled={!walletIdInput}
                >Get Tracks
                </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            {objktData ? (
                <>
                    {isLoading ? <p>Loading...</p> : <>
                        <WalletPlayer
                            audioObjkts={objktData}
                            walletId={walletId}
                        />
                    </>}
                </>
            ) : (<>{isLoading ? <p>Loading...</p> : null}</>)}
        </>
    );
};

export default WalletView;
