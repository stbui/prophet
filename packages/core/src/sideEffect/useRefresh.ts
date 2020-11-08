/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from '../actions';

/**
 * 刷新数据
 * import { useRefresh } from '@stbui/prophet-core';
 *
 * const refresh = useRefresh();
 * refresh();
 */
const useRefresh = () => {
    const dispatch = useDispatch();
    return useCallback(() => dispatch(refreshView()), [dispatch]);
};

export default useRefresh;
