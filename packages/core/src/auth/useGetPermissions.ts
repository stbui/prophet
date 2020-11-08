/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import useAuthProvider from './useAuthProvider';

type GetPermissions = (params?: any) => Promise<any>;

/**
 *
 * @example
 *
 * import { useEffect, useState } from 'react';
 * import { useGetPermissions } from '@stbui/prophet-core';
 *
 * const Roles = () => {
 *     const [permissions, setPermissions] = useState([]);
 *     const getPermissions = useGetPermissions();
 *
 *     useEffect(() => {
 *         getPermissions().then(permissions => setPermissions(permissions))
 *     }, [])
 *
 *     return (
 *         <ul>
 *             {permissions.map((permission, key) => (
 *                 <li key={key}>{permission}</li>
 *             ))}
 *         </ul>
 *     );
 * }
 */
const useGetPermissions = (): GetPermissions => {
    const authProvider = useAuthProvider();

    const getPermissions = useCallback(
        (params: any = {}) => authProvider.getPermissions(params),
        [authProvider]
    );

    return authProvider ? getPermissions : () => Promise.resolve([]);
};

export default useGetPermissions;
