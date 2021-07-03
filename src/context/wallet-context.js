import { createContext, useEffect, useState } from 'react';
import getObjktsCreatedBy from '../api/get-objkts-created-by';
import getObjktsOwnedBy from '../api/get-objkts-owned-by';

export const WalletContext = createContext({tz: null});

const WalletProvider = ({children}) => {
    const [walletId, setWalletId] = useState(null);

    const [objkts, setObjkts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!walletId) return;
        (async() => {
            try {
                const createdObjkts = await getObjktsCreatedBy(walletId);
                const ownedObjkts = await getObjktsOwnedBy(walletId);
                const nextObjkts = [...createdObjkts, ...ownedObjkts];
                setObjkts(nextObjkts);
            } catch(e) {
                setError('Failed to load wallet address');
                setTimeout(() => setError(null), 3000);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [walletId]);

    return (
        <WalletContext.Provider
            value={{
                walletId,
                setWalletId,
                objkts,
                isLoading,
                setIsLoading,
                error,
                setError,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export default WalletProvider;

