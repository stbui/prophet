/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_START, FETCH_END, FETCH_ERROR } from '../actions';

export default () => {
    const dispath = useDispatch();

    const startLoading = useCallback(() => {
        dispath({ type: FETCH_START });
    }, [dispath]);
    const stopLoading = useCallback(() => {
        dispath({ type: FETCH_END });
    }, [dispath]);
    const errorLoading = useCallback(() => {
        dispath({ type: FETCH_ERROR });
    }, [dispath]);

    return { startLoading, stopLoading, errorLoading };
};
