import axios from 'axios';
import { henRadioApi, henRadioApiKey } from '../../constants';

const createPlaylist = (playlist) =>
    axios.post(`${henRadioApi}/playlist`, playlist, {
        headers: {'x-api-key': henRadioApiKey}
    });

export default createPlaylist;
