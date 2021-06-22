import React from 'react';
import useUser from '../../hooks/use-user';
import styles from './styles.module.css';
import { trimWalletAddress } from '../../utilities/general';

const WalletSync = () => {
    const {wallet, sync, unsync} = useUser();
    return <div className={styles.sync_button}>
        <div className={styles.walletAddress}>
            {wallet ? <a href={`https://tzkt.io/${wallet}`}>{trimWalletAddress(wallet)}</a> : null}
        </div>
        {wallet
            ? <button onClick={unsync}>Unsync</button>
            : <button onClick={sync}>Sync</button>}
    </div>
}

export default WalletSync;
