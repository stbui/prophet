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
        (message, type = 'info', description?, duration?) =>
            dispatch(showNotification(type, message, description, duration)),
        [dispatch]
    );
};

export default useNotify;
