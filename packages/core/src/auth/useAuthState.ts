/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useState, useEffect } from 'react';
import useCheckAuth from './useCheckAuth';

/*
import { useAuthState } from '@stbui/prophet-core';
const Page = () => {
    const { authenticated } = useAuthState({ name: 'stbui' });
    return authenticated ? <div>ok</div> : <div>fail</div>;
};
*/

const useAuthState = (params = {}) => {
    const [state, setState] = useState({
        loading: true,
        loaded: false,
        authenticated: true,
    });

    const checkAuth = useCheckAuth();

    useEffect(() => {
        checkAuth(params, false)
            .then(() =>
                setState({ loading: false, loaded: true, authenticated: true })
            )
            .catch(() =>
                setState({ loading: false, loaded: true, authenticated: false })
            );
    }, [checkAuth, params, setState]);

    return state;
};

export default useAuthState;
