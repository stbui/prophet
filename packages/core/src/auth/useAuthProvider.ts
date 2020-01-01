/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';
import AuthProviderContext from './AuthProviderContext';

const useAuthProvider = () => useContext(AuthProviderContext);

export default useAuthProvider;
