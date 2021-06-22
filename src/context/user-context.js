import { createContext, useState, useEffect} from 'react';
import { TezosToolkit } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import getUserMetadataByWalletId from '../api/get-user-metadata-by-wallet-id';

const Tezos = new TezosToolkit('https://mainnet.smartpy.io')
const beaconWallet = new BeaconWallet({
    name: 'hen.radio',
    preferredNetwork: 'mainnet',
})
const network = {
    type: 'mainnet',
    rpcUrl: 'https://mainnet.smartpy.io',
}
Tezos.setWalletProvider(beaconWallet)

export const UserContext = createContext({
    Tezos,
    wallet: null,
    profile: null,
    sync: null,
    unsync: null,
});

const UserProvider = ({children}) => {
    const [wallet, setWallet] = useState(null);
    const [profile, setProfile] = useState(null);

    const sync = async () => {
        const activeAccount = await beaconWallet.client.getActiveAccount()
        if (!activeAccount) {
            await beaconWallet.requestPermissions({ network })
        }
        setWallet(await beaconWallet.getPKH());
    }

    const unsync = async () => {
        // This will clear the active account and the next "syncTaquito" will trigger a new sync
        await beaconWallet.client.clearActiveAccount()
        setWallet(null);
    }

    useEffect(() => {
        sync()
    }, [])

    useEffect(() => {
        if(!wallet) {
            setProfile(null)
            return;
        }
        (async () => {
            try {
                const nextProfile = await getUserMetadataByWalletId(wallet);
                console.log('next profile', nextProfile)
                setProfile(nextProfile.data);
            } catch(e) {
                console.log('Error fetching user profile', e)
            }
        })()
    }, [wallet])

    return (
        <UserContext.Provider
            value={{
                Tezos,
                wallet,
                profile,
                sync,
                unsync
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

