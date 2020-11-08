/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useRefresh from './useRefresh';
import { resolveRedirectTo } from '../util';

/**
 * 跳转指定页面路由
 *
 * @example
 *
 * import { useRedirect } from '@stbui/prophet-core';
 *
 * const redirect = useRedirect();
 * redirect('list', '/users');
 * redirect('edit', '/users', 1);
 * redirect(false);
 * redirect((basePath, id, data) =>{ return `${basePath}/${id}?filter=${data}` }, '/users', 1,{username: 'stui'})
 */
const useRedirect = () => {
    const history = useHistory();
    const refresh = useRefresh();

    return useCallback(
        (redirectTo, basePath: string = '', id?, data?) => {
            if (!redirectTo) {
                if (history.location.state || history.location.search) {
                    history.replace({
                        ...history.location,
                        state: {},
                        search: undefined,
                    });
                } else {
                    refresh();
                }

                return;
            }

            history.push(resolveRedirectTo(redirectTo, basePath, id, data));
        },
        [history]
    );
};

export default useRedirect;
