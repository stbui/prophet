/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';

/*
import { useEffect,useState } from 'react';
import { useGetPermissions } from '@stbui/prophet-core';
import View from './View';

const Page = () => {
    const [permissions, setPermissions] = useState([]);
    const getPermissions = useGetPermissions();
    useEffect(() => {
        getPermissions().then(permissions => setPermissions(permissions))
    }, []);

    return <div>{
        permissions.map((permission, key) => (<div key={key}>{permission}</div>))
    }</div>;
};
*/

const useGetPermissions = (): any => {
    const authProvider = useAuthProvider();

    const getPermissions = useCallback(
        (params: any = {}) => authProvider.getPermissions(params),
        [authProvider]
    );

    return authProvider ? getPermissions : () => Promise.resolve([]);
};

export default useGetPermissions;
