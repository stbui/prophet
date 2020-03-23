import { useCallback } from 'react';
import { useHistory } from 'react-router';
import useRefresh from './useRefresh';

const resolveRedirectTo = (redirectTo, basePath: string, id?) => {
    if (typeof redirectTo === 'function') {
        return resolveRedirectTo(basePath, id);
    }

    switch (redirectTo) {
        case 'list':
            return basePath;
        case 'create':
            return `${basePath}/create`;
        case 'edit':
            return `${basePath}/${id}`;
        case 'show':
            return `${basePath}/${id}/show`;
        default:
            redirectTo;
    }
};

/**
 * 重定向
 * 
 * @example
 * 
 * const redirect = useRedirect();
 * redirect('list', '/users');
 * redirect('edit', '/users', 123);
 * redirect(false);
 * redirect((redirectTo, basePath, is, data) => ...)
 */
const useRedirect = () => {
    const history = useHistory();
    const refresh = useRefresh();

    return useCallback(
        (redirectTo, basePath = '', id) => {
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

            history.push(resolveRedirectTo(redirectTo, basePath, id));
        },
        [history]
    );
};

export default useRedirect;
