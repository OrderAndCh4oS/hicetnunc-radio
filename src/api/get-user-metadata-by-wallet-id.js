import axios from 'axios';
import { tzktApi } from '../constants';

const getUserMetadataByWalletId = (walletId) =>
    axios.get(`${tzktApi}/${walletId}/metadata`);

export default getUserMetadataByWalletId;
