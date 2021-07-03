import { createContext, useEffect, useState } from 'react';
import getObjktsCreatedBy from '../api/get-objkts-created-by';
import getObjktsOwnedBy from '../api/get-objkts-owned-by';
import { useHistory } from 'react-router';

export const WalletContext = createContext({tz: null});

const WalletProvider = ({children}) => {
    const [walletId, setWalletId] = useState(null);
    const history = useHistory();
    const [objkts, setObjkts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!walletId) return;
        history.push(`/tz/${walletId}`);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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

