import { useContext } from 'react';
import { UserContext } from '../context/user-context';

const useUser = () => useContext(UserContext);

export default useUser;
