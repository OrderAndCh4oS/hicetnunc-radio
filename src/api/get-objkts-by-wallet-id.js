import axios from 'axios';
import { hicetnuncApi } from '../constants';

const getObjktsByWalletId = (walletId) =>
    axios.get(`${hicetnuncApi}/tz?tz=${walletId}`);

export default getObjktsByWalletId;
