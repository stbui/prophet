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
        case 'edit':
            return `${basePath}/${id}/show`;
        default:
            redirectTo;
    }
};

const useRedirect = () => {
    const history = useHistory();
    const refresh = useRefresh();

    return useCallback(
        (redirectTo, basePath = '', id) => {
            if (!redirectTo) {
                refresh();
                return;
            }

            history.push(resolveRedirectTo(redirectTo, basePath, id));
        },
        [history]
    );
};

export default useRedirect;
