/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_START, FETCH_END, FETCH_ERROR } from '../actions';

/**
 * @example
 *
 * import { useUpdateLoading } from '@stbui/prophet-core'
 *
 * const MyComponent = () => {
 *      const { startLoading, stopLoading } = useUpdateLoading();
 *      useEffect(() => {
 *          startLoading();
 *          fetch('http://www.stbui.com/api')
 *              .finally(() => stopLoading());
 *      }, []);
 *      return <span>stbui</span>;
 * }
 *
 */
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
