/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import useGetPermissions from './useGetPermissions';

interface Permissions {
    loading: boolean;
    loaded: boolean;
    [key: string]: any;
}

interface State {
    loading: boolean;
    loaded: boolean;
    permissions?: any;
    error?: any;
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
 *    const { loaded, permissions } = usePermissions();
 *    if (loaded && permissions === 'editor') {
 *        return <div>eidtor</div>;
 *    } else {
 *        return <div>show</div>;
 *    }
 * };
 */
const usePermissions = (params = {}): Permissions => {
    const [state, setState] = useState<State>({
        loading: true,
        loaded: false,
    });
    const getPermissions = useGetPermissions();

    useEffect(() => {
        getPermissions(params)
            .then(permissions => {
                setState({ loading: false, loaded: true, permissions });
            })
            .catch(error => {
                setState({
                    loading: false,
                    loaded: true,
                    error,
                });
            });
    }, [getPermissions, JSON.stringify(params), setState]);

    return state;
};

export default usePermissions;
