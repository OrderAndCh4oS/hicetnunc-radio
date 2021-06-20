import axios from 'axios';
import { henRadioApi, henRadioApiKey } from '../../constants';

const getPlaylists = () =>
    axios.get(`${henRadioApi}/playlist`, {
        headers: {
            'x-api-key': henRadioApiKey,
        },
    });

export default getPlaylists;
