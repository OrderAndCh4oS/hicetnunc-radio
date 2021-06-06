import { createContext, useEffect, useState } from 'react';
import getObjktsByWalletId from '../api/get-objkts-by-wallet-id';
import { audioMimeTypes } from '../constants';

export const WalletContext = createContext({tz: null});

const WalletProvider = ({children}) => {
    const [walletId, setWalletId] = useState(null);

    const [objktData, setObjktData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!walletId) return;
        (async() => {
            try {
                const response = await getObjktsByWalletId(walletId);
                setObjktData(filterAudio(response?.data?.result || []));
            } catch(e) {
                setError('Failed to load wallet address');
                setTimeout(() => setError(null), 3000);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [walletId]);

    const filterAudio = (objkts) =>
        objkts.filter(o => audioMimeTypes.includes(o.token_info.formats[0].mimeType));

    return (
        <WalletContext.Provider
            value={{walletId, setWalletId, objktData, isLoading, setIsLoading, error, setError}}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

