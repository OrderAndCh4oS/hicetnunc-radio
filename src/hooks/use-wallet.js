import { useContext } from 'react';
import { WalletContext } from '../context/wallet-context';

const useWallet = () => useContext(WalletContext);

export default useWallet;
