import { useContext } from 'react';
import AuthProviderContext from './AuthProviderContext';

const useAuthProvider = () => useContext(AuthProviderContext);

export default useAuthProvider;
