/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import useGetPermissions from './useGetPermissions';

/*
import { usePermissions } from '@stbui/prophet-core';
const Page = () => {
    const { loaded, permissions } = usePermissions();
    if (loaded && permissions === 'editor') {
        return <div>eidtor</div>;
    } else {
        return <div>show</div>;
    }
};
*/

const usePermissions = (params = {}) => {
    const [state, setState] = useState<any>({
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
    }, [getPermissions, params, setState]);

    return state;
};

export default usePermissions;
