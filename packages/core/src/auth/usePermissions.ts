/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import useGetPermissions from './useGetPermissions';

interface Permissions {
    isLoading: boolean;
    permissions?: any;
    error?: Error;
}

interface State {
    isLoading: boolean;
    permissions?: any;
    error?: Error;
}

/**
 *
 * @param params
 *
 * @example
 *
 * import { usePermissions } from '@stbui/prophet-core';
 *
 * const MyApp = () => {
 *    const { isLoading, permissions } = usePermissions();
 *    if (isLoading && permissions === 'editor') {
 *        return <div>eidtor</div>;
 *    } else {
 *        return <div>show</div>;
 *    }
 * };
 */
const usePermissions = (params = {}): Permissions => {
    const [state, setState] = useState<State>({
        isLoading: true,
    });
    const getPermissions = useGetPermissions();

    useEffect(() => {
        getPermissions(params)
            .then(permissions => {
                setState({ isLoading: false, permissions });
            })
            .catch(error => {
                setState({
                    isLoading: false,
                    error,
                });
            });
    }, [getPermissions, JSON.stringify(params), setState]);

    return state;
};

export default usePermissions;
