/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showNotification } from '../actions';

/**
 * @example
 *
 * import { useNotify } from '@stbui/prophet-core';
 *
 * const notify = useNotify();
 * notify('通知');
 * notify('通知', 'warning');
 * notify('通知', 'warning', '通知内容');
 * notify('通知', 'warning', '通知内容'， 1000);
 */
const useNotify = () => {
    const dispatch = useDispatch();

    return useCallback(
        (message: string, type = 'info', options?) =>
            dispatch(showNotification(message, type, options)),
        [dispatch]
    );
};

export default useNotify;
